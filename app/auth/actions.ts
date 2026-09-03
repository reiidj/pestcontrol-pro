'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirmPassword') as string
    const captchaToken = formData.get('captchaToken') as string

    console.log('--- SIGNUP ATTEMPT ---', { 
        email, 
        passLength: password?.length, 
        hasCaptcha: !!captchaToken 
    })

    if (password !== confirmPassword) {
        return redirect(`/login?error=${encodeURIComponent('Passwords do not match.')}`)
    }

    if (!captchaToken) {
        return redirect(`/login?error=${encodeURIComponent('Please complete the security challenge.')}`)
    }

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            captchaToken,
        }
    })

    if (error) {
        console.error('Signup error:', error.message)
        
        // Intercept Supabase's default duplicate email message
        let errorMessage = error.message
        if (errorMessage.includes('User already registered') || errorMessage.includes('already exists')) {
            errorMessage = 'An account with this email already exists. Please log in.'
        }

        return redirect(`/login?error=${encodeURIComponent(errorMessage)}`)
    }

    revalidatePath('/', 'layout')
    redirect('/login?message=Success! Please check your email to confirm.')
}

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string
    const captchaToken = formData.get('captchaToken') as string

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        options: {
            captchaToken: captchaToken || undefined,
        }
    })

    if (error) {
        return redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    // --- ROLE CHECK LOGIC ---
    const role = data.user.app_metadata?.role || 'customer'

    revalidatePath('/', 'layout')

    if (role === 'admin') {
        redirect('/admin')
    } else {
        redirect('/') 
    }
}

export async function signout() {
  const supabase = await createClient()
  
  // 1. Tell Supabase to sign out
  await supabase.auth.signOut()
  
  // 2. Clear the cache for the current path
  revalidatePath('/', 'layout')
  
  // 3. Send them back to the welcome page
  redirect('/')
}

export async function createOrder(formData: FormData) {
  const supabase = await createClient()

  // 1. Extract values from the new form data
  const serviceId = formData.get('serviceId') as string
  const scheduledDateString = formData.get('scheduledDate') as string
  const firstName = formData.get('firstName') as string
  const lastName = formData.get('lastName') as string
  const address = formData.get('address') as string
  const finalPrice = formData.get('finalPrice') as string

  // 2. Authenticate the User
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 3. BACKEND VALIDATION: Check for missing fields
  if (!scheduledDateString || !firstName || !lastName || !address || !finalPrice) {
    return { error: 'Please fill out all required fields to proceed.' }
  }

  // 4. BACKEND VALIDATION: Block historical dates
  const chosenDate = new Date(scheduledDateString)
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (chosenDate < today) {
    return { error: 'Invalid date selection. You cannot book an appointment in the past.' }
  }

  // 5. Insert the order
  const { error } = await supabase.from('orders').insert({
    user_id: user.id,
    service_id: serviceId,
    scheduled_date: scheduledDateString,
    first_name: firstName,
    last_name: lastName,
    address: address,
    total_price: parseFloat(finalPrice), // Ensured as numeric for PostgreSQL
    status: 'pending', 
  })

  if (error) {
    console.error('Order Error:', error.message)
    return { error: 'Failed to place order. Please try again.' }
  }

  // 6. Refresh & Redirect
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
}

export async function updateOrderStatus(formData: FormData) {
  const supabase = await createClient()

  // 1. Get data from the admin form submission
  const orderId = formData.get('orderId') as string
  const newStatus = formData.get('status') as string

  // 2. Security Check: Make sure the person doing this is actually an admin
  const { data: { user } } = await supabase.auth.getUser()
  if (!user || user.app_metadata?.role !== 'admin') {
    throw new Error('Unauthorized access.')
  }

  // 3. Update the database row
  const { error } = await supabase
    .from('orders')
    .update({ status: newStatus })
    .eq('id', orderId)

  if (error) {
    console.error('Update Error:', error.message)
    return { error: 'Failed to update order status.' }
  }

  // 4. Instantly refresh both dashboards so everyone sees the updated status
  revalidatePath('/admin')
  revalidatePath('/dashboard')
}

export async function validatePromoCode(code: string) {
  const supabase = await createClient()
  
  const { data, error } = await supabase
    .from('promo_codes')
    .select('discount_percent, is_active, expires_at')
    .eq('code', code.toUpperCase())
    .single()

  if (error || !data || !data.is_active) {
    return { error: 'Invalid or expired promo code.' }
  }

  // Check expiration if a date is set
  if (data.expires_at && new Date(data.expires_at) < new Date()) {
    return { error: 'This promo code has expired.' }
  }

  return { discount: data.discount_percent }
}

export async function createPromoCode(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.app_metadata?.role !== 'admin') {
    redirect('/admin/promos?error=Unauthorized access.')
  }

  const code = formData.get('code') as string
  const discountPercent = parseFloat(formData.get('discountPercent') as string)
  const expiresAt = formData.get('expiresAt') as string

  const { error } = await supabase.from('promo_codes').insert({
    code: code.toUpperCase().trim(),
    discount_percent: discountPercent,
    is_active: true,
    expires_at: expiresAt ? new Date(expiresAt).toISOString() : null,
    created_at: new Date().toISOString(),
  })

  if (error) {
    console.error('Error creating promo code:', error.message)
    redirect('/admin/promos?error=Failed to create promo code. It may already exist.')
  }

  revalidatePath('/admin/promos')
  redirect('/admin/promos?message=Promo code created successfully!')
}

export async function togglePromoStatus(formData: FormData) {
  const supabase = await createClient()
  
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.app_metadata?.role !== 'admin') {
    return { error: 'Unauthorized' }
  }

  const code = formData.get('code') as string
  const currentState = formData.get('currentState') === 'true'

  const { error } = await supabase.from('promo_codes')
    .update({ is_active: !currentState })
    .eq('code', code)

  if (error) {
    console.error('Error toggling promo status:', error.message)
    return { error: 'Failed to update promo status.' }
  }

  revalidatePath('/admin/promos')
}

export async function submitIssue(formData: FormData) {
  const supabase = await createClient()
  const title = formData.get('title') as string
  const description = formData.get('description') as string

  const { data: { user } } = await supabase.auth.getUser()

  const { error } = await supabase.from('site_issues').insert({
    user_id: user?.id || null,
    title,
    description,
    status: 'pending'
  })

  if (error) throw new Error('Failed to submit issue')
}

export async function updateIssueStatus(formData: FormData) {
  const supabase = await createClient()
  const id = formData.get('id') as string
  const status = formData.get('status') as string

  const { data: { user } } = await supabase.auth.getUser()
  if (user?.app_metadata?.role !== 'admin') throw new Error('Unauthorized')

  const { error } = await supabase
    .from('site_issues')
    .update({ status })
    .eq('id', id)

  if (error) throw new Error('Failed to update status')
  
  revalidatePath('/admin/issues')
}
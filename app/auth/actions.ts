'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error('Signup error:', error.message)
        // Redirect back to login with the specific error message
        return redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    revalidatePath('/', 'layout')
    // Better to send them back to login with a "Check Email" message
    redirect('/login?message=Success! Please check your email to confirm.')
}

export async function login(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect(`/login?error=${encodeURIComponent(error.message)}`)
    }

    // --- ROLE CHECK LOGIC ---
    // We check the JWT first since we set up the metadata sync earlier
    const role = data.user.app_metadata?.role || 'customer'

    revalidatePath('/', 'layout')

    if (role === 'admin') {
        redirect('/admin')
    } else {
        // If they are a customer, send them back to the welcome/landing page
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
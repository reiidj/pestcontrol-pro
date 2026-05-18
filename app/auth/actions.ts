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

  // 1. Extract values from the form data
  const serviceId = formData.get('serviceId') as string
  const scheduledDateString = formData.get('scheduledDate') as string

  // 2. Authenticate the User
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 3. BACKEND VALIDATION: Check if empty
  if (!scheduledDateString) {
    return { error: 'Please select a preferred date for the service.' }
  }

  // 4. BACKEND VALIDATION: Block historical dates, block old dates not possible
  // Create a Date object from the input string (YYYY-MM-DD format parsed as midnight UTC)
  const chosenDate = new Date(scheduledDateString)
  
  // Create a comparison date for today, set exactly to midnight to allow booking for today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (chosenDate < today) {
    return { error: 'Invalid date selection. You cannot book an appointment in the past.' }
  }

  // 5. Insert the order if validation passes
  const { error } = await supabase.from('orders').insert({
    user_id: user.id,
    service_id: serviceId,
    scheduled_date: scheduledDateString,
    status: 'pending', 
  })

  if (!scheduledDateString) {
    redirect('/?error=Please select a preferred date for the service.')
  }

  if (chosenDate < today) {
    redirect('/?error=You cannot book an appointment in the past.')
  }

  if (error) {
    console.error('Order Error:', error.message)
    redirect('/?error=Failed to place order. Please try again.')
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
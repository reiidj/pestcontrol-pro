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

export async function createOrder(serviceId: string) {
  const supabase = await createClient()

  // 1. Get the current user
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return redirect('/login') // add a message here in the future about needing to log in to place an order
  }

  // 2. Insert the order
  const { error } = await supabase.from('orders').insert({
    user_id: user.id,
    service_id: serviceId,
    status: 'pending'
  })

  if (error) {
    console.error('Order Error:', error.message)
    return { error: 'Failed to place order' }
  }

  // 3. Refresh and send to their dashboard
  revalidatePath('/dashboard', 'layout')
  redirect('/dashboard')
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
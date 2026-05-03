'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function signup(formData: FormData) {
    const supabase = await createClient()

    // get data from the form
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    // tells supabase to create the user
    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.error('Signup error:', error.message)
        return redirect('/auth/error')
    }

    // send to dashboard
    revalidatePath('/', 'layout')
    redirect('/app')
}
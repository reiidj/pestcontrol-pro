import { createClient } from '@/utils/supabase/server'
import SignOutButton from './SignOutButton'
import { NavbarClient} from './NavbarClient'

export default async function Navbar() {
  const supabase = await createClient()

  // 1. Fetch current user session details
  const { data: { user } } = await supabase.auth.getUser()

  // 2. Check if user metadata indicates they are an admin
  const isAdmin = user?.app_metadata?.role === 'admin'

  return (
    <NavbarClient
      user={user ? { email: user.email ?? undefined } : null}
      isAdmin={isAdmin}
      signOutButton={<SignOutButton />}
    />
  )
}
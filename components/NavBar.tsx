import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'
import SignOutButton from './SignOutButton'

export default async function Navbar() {
  const supabase = await createClient()
  
  // 1. Fetch current user session details
  const { data: { user } } = await supabase.auth.getUser()
  
  // 2. Check if user metadata indicates they are an admin
  const isAdmin = user?.app_metadata?.role === 'admin'

  return (
    <nav className="flex items-center justify-between px-8 py-6 border-b bg-white">
      <Link href="/" className="text-xl font-bold text-blue-600">
        PestControl Pro
      </Link>
      
      <div className="space-x-6 flex items-center">
        <Link href="#services" className="text-gray-600">Services</Link>
        
        {/* New Admin Dashboard shortcut injection */}
        {isAdmin && (
          <Link 
            href="/admin" 
            className="text-xs font-bold uppercase tracking-wider bg-blue-50 border border-blue-200 text-blue-600 px-3 py-1.5 rounded-lg hover:bg-blue-100 transition"
          >
            Admin Panel
          </Link>
        )}
        
        {user ? (
          /* 🌟 FIXED: SignOutButton goes inside the authenticated user block */
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">{user.email}</span>
            <Link href="/dashboard" className="text-blue-600 font-medium">My Bookings</Link>
            <div className="h-4 w-px bg-gray-200 mx-1"></div> {/* Small visual divider */}
            <SignOutButton />
          </div>
        ) : (
          /* Shows ONLY the Login button when unauthenticated */
          <Link href="/login" className="px-5 py-2 bg-blue-600 text-white rounded-full text-sm font-medium">
            Login
          </Link>
        )}
      </div>
    </nav>
  )
}
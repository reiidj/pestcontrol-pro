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
    <div className="fixed top-4 left-0 right-0 z-50 flex justify-center px-4 w-full pointer-events-none">
      
      {/* Pill Container (re-enable pointer events for the nav itself) */}
      <nav className="pointer-events-auto w-full max-w-7xl bg-white/95 backdrop-blur-md shadow-sm rounded-full px-6 py-3 flex items-center justify-between border border-gray-200">
        
        {/* ─── BRANDING (Left) ────────────────────────────────────────────── */}
        <div className="flex items-center w-1/4">
          <Link href="/" className="text-[1.6rem] font-black text-[#3A6346] tracking-tight">
            NestGuard
          </Link>
        </div>
        
        {/* ─── PAGE NAVIGATION (Center) ───────────────────────────────────── */}
        <div className="hidden md:flex items-center justify-center gap-8 w-2/4">
          <Link href="/#services" className="text-[0.9rem] font-bold text-gray-700 hover:text-[#3A6346] transition-colors">
            Services
          </Link>
          <Link href="/#standards" className="text-[0.9rem] font-bold text-gray-700 hover:text-[#3A6346] transition-colors">
            Standards
          </Link>
          <Link href="/#reviews" className="text-[0.9rem] font-bold text-gray-700 hover:text-[#3A6346] transition-colors">
            Reviews
          </Link>
          <Link href="/contact" className="text-[0.9rem] font-bold text-gray-700 hover:text-[#3A6346] transition-colors">
            Contact
          </Link>
        </div>
        
        {/* ─── ACTIONS & AUTH (Right) ─────────────────────────────────────── */}
        <div className="flex items-center justify-end gap-5 w-1/4">
          
          {/* Search Icon */}
          <button className="text-gray-700 hover:text-black transition-colors" aria-label="Search">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-[18px] h-[18px]">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </button>

          {/* Vertical Divider */}
          <div className="h-6 w-px bg-gray-300"></div>
          
          {/* Auth State */}
          {user ? (
            <div className="flex items-center gap-4 sm:gap-6">
              {isAdmin && (
                <Link 
                  href="/admin" 
                  className="hidden sm:block text-sm font-bold text-[#0F1F15] hover:text-[#4A7C59] transition-colors"
                >
                  Admin
                </Link>
              )}
              
              <Link 
                href="/dashboard" 
                className="text-sm font-bold text-[#0F1F15] hover:text-[#4A7C59] transition-colors"
              >
                My Bookings
              </Link>

              {/* Vertical Divider for clean separation */}
              <div className="w-[1px] h-4 bg-[#E8E4DC] hidden sm:block"></div>

              <div className="flex items-center">
                <SignOutButton />
              </div>
            </div>
          ) : (
            <Link 
              href="/login" 
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-[#0F1F15] hover:bg-[#4A7C59] text-white rounded-full text-sm font-bold transition-all shadow-md active:scale-95"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
              </svg>
              Sign In
            </Link>
          )}
        </div>

      </nav>
    </div>
  )
}
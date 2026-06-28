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
    <nav className="sticky top-0 z-50 w-full bg-[#F9F7F2]/80 backdrop-blur-xl border-b border-[#E8E4DC] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        
        {/* ─── BRANDING ─────────────────────────────────────────────────── */}
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#0F1F15] to-[#162D1D] flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-white">
                <path fillRule="evenodd" d="M9.293 2.293a1 1 0 0 1 1.414 0l7 7A1 1 0 0 1 17 11h-1v6a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1v-6H3a1 1 0 0 1-.707-1.707l7-7Z" clipRule="evenodd" />
              </svg>
            </div>
            <span className="text-xl font-black text-[#0F1F15] tracking-tight group-hover:text-[#4A7C59] transition-colors">
              EcoGuard
            </span>
          </Link>

          {/* ─── PAGE NAVIGATION (DESKTOP) ──────────────────────────────── */}
          <div className="hidden md:flex items-center gap-7">
            <Link href="/#services" className="text-[0.85rem] font-bold text-[#6B7A6E] hover:text-[#0F1F15] transition-colors">
              Services
            </Link>
            <Link href="/#standards" className="text-[0.85rem] font-bold text-[#6B7A6E] hover:text-[#0F1F15] transition-colors">
              Standards
            </Link>
            <Link href="/#reviews" className="text-[0.85rem] font-bold text-[#6B7A6E] hover:text-[#0F1F15] transition-colors">
              Reviews
            </Link>
            <Link href="/contact" className="text-[0.85rem] font-bold text-[#6B7A6E] hover:text-[#0F1F15] transition-colors">
              Contact
            </Link>
          </div>
        </div>
        
        {/* ─── ACTIONS & AUTH ───────────────────────────────────────────── */}
        <div className="flex items-center gap-4 md:gap-6">
          
          {/* Admin Dashboard shortcut badge */}
          {isAdmin && (
            <Link 
              href="/admin" 
              className="hidden sm:inline-flex items-center text-[0.65rem] font-bold uppercase tracking-[0.15em] bg-[#C8A96E]/10 border border-[#C8A96E]/30 text-[#C8A96E] px-3 py-1.5 rounded-full hover:bg-[#C8A96E]/20 transition-colors shadow-sm"
            >
              Admin Portal
            </Link>
          )}
          
          {user ? (
            /* Authenticated Active Session Layout */
            <div className="flex items-center gap-4">
              <Link 
                href="/dashboard" 
                className="text-[0.85rem] font-bold text-[#4A7C59] hover:text-[#0F1F15] transition-colors"
              >
                My Bookings
              </Link>
              
              <div className="hidden sm:block h-5 w-px bg-[#E8E4DC]"></div>
              
              <div className="hidden sm:flex items-center gap-2.5 bg-white border border-[#E8E4DC] px-2 py-1 rounded-full shadow-sm">
                <div className="w-6 h-6 rounded-full bg-[#EBF2ED] text-[#4A7C59] flex items-center justify-center text-[0.65rem] font-black uppercase">
                  {user.email?.charAt(0) || 'U'}
                </div>
                <span className="text-[0.75rem] font-semibold text-[#6B7A6E] pr-2 max-w-[120px] truncate">
                  {user.email}
                </span>
              </div>
              
              <SignOutButton />
            </div>
          ) : (
            /* Unauthenticated Single Action Target */
            <Link 
              href="/login" 
              className="px-6 py-2.5 bg-gradient-to-b from-[#4A7C59] to-[#3A6346] hover:from-[#3A6346] hover:to-[#2B4A34] text-white rounded-xl text-[0.85rem] font-bold shadow-[0_4px_14px_rgba(74,124,89,0.25)] hover:shadow-[0_6px_20px_rgba(74,124,89,0.35)] hover:-translate-y-0.5 transition-all duration-200 active:scale-95"
            >
              Client Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  )
}
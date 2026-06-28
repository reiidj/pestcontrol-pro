import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/NavBar'
import Link from 'next/link'

export default async function DashboardPage() {
  const supabase = await createClient()

  // 1. Authenticate user
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  // 2. Fetch bookings matching user id
  const { data: bookings, error } = await supabase
    .from('orders')
    .select('id, status, scheduled_date, created_at, services(name, price)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Dashboard Fetch Error:", error.message)
  }

  // Refactored to map your green/eco palette into highly polished Tailwind classes
  const STATUS_STYLES = {
    pending: {
      rail: 'bg-amber-400',
      boxBg: 'bg-amber-50/50',
      boxBorder: 'border-amber-200/50',
      badgeBg: 'bg-amber-100/50',
      badgeBorder: 'border-amber-200',
      text: 'text-amber-800',
      dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
      label: 'Pending',
    },
    scheduled: {
      rail: 'bg-[#4A7C59]', // Premium Sage
      boxBg: 'bg-[#EBF2ED]/60', // Light Sage Tint
      boxBorder: 'border-[#C4D9CA]/60',
      badgeBg: 'bg-[#EBF2ED]',
      badgeBorder: 'border-[#C4D9CA]',
      text: 'text-[#1B4332]',
      dot: 'bg-[#4A7C59] shadow-[0_0_8px_rgba(74,124,89,0.5)]',
      label: 'Scheduled',
    },
    completed: {
      rail: 'bg-emerald-500',
      boxBg: 'bg-emerald-50/50',
      boxBorder: 'border-emerald-200/50',
      badgeBg: 'bg-emerald-100/50',
      badgeBorder: 'border-emerald-200',
      text: 'text-emerald-800',
      dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
      label: 'Completed',
    },
    cancelled: {
      rail: 'bg-zinc-300',
      boxBg: 'bg-zinc-50/80',
      boxBorder: 'border-zinc-200/80',
      badgeBg: 'bg-zinc-100',
      badgeBorder: 'border-zinc-200',
      text: 'text-zinc-600',
      dot: 'bg-zinc-400',
      label: 'Cancelled',
    },
  } as const

  return (
    <div className="min-h-screen font-sans bg-[#F9F8F6] text-[#0F1F15] selection:bg-[#4A7C59] selection:text-white">
      
      {/* ─── NAVBAR ───────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ─── SYMMETRICAL PREMIUM HEADER ─────────────────────────────────── */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0F1F15] to-[#162D1D] border-b border-[#23402B]">
        
        {/* Symmetrical Ambient Mesh Glow */}
        <div 
          className="absolute inset-0 pointer-events-none flex justify-center"
          aria-hidden
        >
          {/* Centered Sage Glow */}
          <div className="absolute -top-32 w-[800px] h-[500px] bg-[#4A7C59]/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="relative max-w-[1000px] mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center">
          
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#C8A96E]" />
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#C8A96E]">
              Customer Portal
            </p>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#C8A96E]" />
          </div>
          
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 drop-shadow-sm">
            My Bookings
          </h1>
          
          {user.email && (
            <p className="text-[0.95rem] font-medium text-[#C4D9CA]/80 max-w-md">
              Managing appointments for <span className="text-white">{user.email}</span>
            </p>
          )}

          {bookings && bookings.length > 0 && (
            <div className="mt-8 inline-flex items-center justify-center">
              <span className="text-[0.75rem] font-semibold px-4 py-1.5 rounded-full bg-white/5 text-[#EBF2ED] border border-white/10 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
                {bookings.length} {bookings.length === 1 ? 'Active Request' : 'Active Requests'}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* ─── BOOKING LIST (SYMMETRICAL PADDING & CENTERED FLOW) ─────────── */}
      <main className="max-w-[900px] mx-auto px-6 pb-24 pt-12">
        {bookings && bookings.length > 0 ? (
          <div className="space-y-5">
            {(bookings as any[]).map((booking) => {
              const status = (booking.status || 'pending') as keyof typeof STATUS_STYLES
              const config = STATUS_STYLES[status]

              return (
                <div
                  key={booking.id}
                  className="relative flex flex-col md:flex-row md:items-stretch bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(15,31,21,0.04)] hover:shadow-[0_12px_30px_-8px_rgba(74,124,89,0.15)] hover:-translate-y-[2px] transition-all duration-300 group"
                >
                  {/* ── Status rail (left border accent) ── */}
                  <div 
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.rail}`} 
                    aria-hidden 
                  />

                  {/* ── Main content ── */}
                  <div className="flex flex-1 flex-col md:flex-row md:items-center justify-between gap-6 pl-8 pr-6 py-5">
                    
                    {/* Left: Service Info */}
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[1.1rem] text-[#0F1F15] tracking-tight truncate group-hover:text-[#4A7C59] transition-colors">
                        {booking.services?.name || 'EcoGuard Signature Service'}
                      </h3>
                      
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 mt-2.5">
                        <div className="flex items-center gap-2 text-[0.85rem] text-[#6B7A6E]">
                          <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">
                            {booking.scheduled_date
                              ? new Date(booking.scheduled_date).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })
                              : 'Pending Confirmation'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 text-[0.85rem] text-[#6B7A6E]">
                          <svg className="w-4 h-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 8.25h15m-16.5 7.5h15m-1.8-13.5l-3.9 19.5m-2.1-19.5l-3.9 19.5" />
                          </svg>
                          <span className="font-mono text-[0.8rem] tracking-wider uppercase">
                            {booking.id.slice(0, 8)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Symmetrical Price + Status Block */}
                    <div className={`flex items-center gap-6 px-6 py-4 rounded-xl border shrink-0 ${config.boxBg} ${config.boxBorder}`}>
                      
                      {/* Price */}
                      <div className="text-right flex flex-col justify-center">
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#6B7A6E]/80 mb-1">
                          Amount
                        </p>
                        <p className="text-xl font-black tracking-tight text-[#0F1F15] leading-none">
                          ${booking.services?.price?.toFixed(2) || '0.00'}
                        </p>
                      </div>

                      {/* Soft Divider */}
                      <div className={`w-px h-10 ${config.boxBorder}`} aria-hidden />

                      {/* Status badge */}
                      <div className="flex flex-col justify-center">
                        <p className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-[#6B7A6E]/80 mb-1.5">
                          Status
                        </p>
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[0.7rem] font-bold border shadow-sm ${config.badgeBg} ${config.badgeBorder} ${config.text}`}>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
                          {config.label}
                        </span>
                      </div>
                      
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          /* ── SYMMETRICAL EMPTY STATE ── */
          <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white border border-[#E8E4DC] rounded-3xl shadow-[0_4px_20px_-4px_rgba(15,31,21,0.03)] relative overflow-hidden">
            
            {/* Subtle empty state background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#EBF2ED] rounded-full blur-[80px] pointer-events-none" />

            <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EBF2ED] to-[#C4D9CA]/30 border border-[#C4D9CA] flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-7 h-7 text-[#4A7C59]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            
            <h3 className="relative z-10 text-xl font-extrabold tracking-tight text-[#0F1F15]">
              No bookings yet
            </h3>
            <p className="relative z-10 text-[0.95rem] text-[#6B7A6E] mt-2 max-w-sm leading-relaxed">
              Your confirmed EcoGuard appointments and service history will appear here seamlessly once scheduled.
            </p>

            <Link 
              href="/" 
              className="relative z-10 mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[0.9rem] font-bold text-white bg-gradient-to-b from-[#4A7C59] to-[#3A6346] shadow-[0_4px_14px_rgba(74,124,89,0.25)] hover:shadow-[0_6px_20px_rgba(74,124,89,0.35)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:ring-offset-2 focus:ring-offset-[#F9F8F6] transition-all active:scale-[0.98]"
            >
              Browse Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}

        {/* ── Bottom symmetrical action link ── */}
        {bookings && bookings.length > 0 && (
          <div className="mt-14 flex justify-center">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-[#4A7C59] hover:text-[#0F1F15] transition-colors group px-6 py-3 rounded-full hover:bg-[#EBF2ED]/50"
            >
              Book another service
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
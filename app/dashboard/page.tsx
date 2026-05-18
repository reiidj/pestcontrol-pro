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

  const STATUS_STYLES = {
    pending: {
      bg: 'bg-amber-50 border-amber-200 text-amber-700',
      dot: 'bg-amber-400',
      label: 'Pending'
    },
    scheduled: {
      bg: 'bg-blue-50 border-blue-200 text-blue-700',
      dot: 'bg-blue-500',
      label: 'Scheduled'
    },
    completed: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      dot: 'bg-emerald-500',
      label: 'Completed'
    },

    cancelled: {
      bg: 'bg-slate-100 border-slate-200 text-slate-600',
      dot: 'bg-slate-400',
      label: 'Cancelled'
    }
  } as const;


  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Navbar />

      {/* Main Content Body with its own clean padding and alignment layout */}
      <div className="max-w-4xl mx-auto p-8 mt-4">
        <h1 className="text-3xl font-bold mb-6">My Bookings</h1>

        <div className="space-y-4">
          {bookings && bookings.length > 0 ? (
            (bookings as any[]).map((booking) => (
              <div key={booking.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-xs flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">
                    {booking.services?.name || 'Pest Control Service'}
                  </h3>
                  <p className="text-sm text-slate-500 mt-1">
                    Scheduled Date: {booking.scheduled_date ? new Date(booking.scheduled_date).toLocaleDateString() : 'TBD'}
                  </p>
                  <p className="text-xs font-mono text-slate-400 mt-1">Order #{booking.id.slice(0,8)}</p>
                </div>
                
                <div className="flex items-center gap-4">
                  <span className="text-lg font-black text-slate-900">${booking.services?.price || '0.00'}</span>
                  
                  {/* 🌟 NEW REFACTORED STATUS BADGE */}
                  {(() => {
                    const status = (booking.status || 'pending') as keyof typeof STATUS_STYLES;
                    const config = STATUS_STYLES[status];
                    
                    return (
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.bg}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                        {config.label}
                      </span>
                    );
                  })()}
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 text-slate-400 border border-dashed border-slate-200 rounded-xl bg-white shadow-xs">
              <p className="italic">You haven't booked any services yet.</p>
              <Link href="/" className="inline-block mt-4 text-sm font-bold text-blue-600 hover:underline">
                Browse Services & Book Now →
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
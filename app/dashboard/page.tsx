// app/dashboard/page.tsx
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Navbar from '@/components/NavBar'
import BookingsDashboard from './BookingsDashboard'

export default async function DashboardPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    redirect('/login')
  }

  const { data: bookings, error } = await supabase
    .from('orders')
    .select('id, status, scheduled_date, created_at, services(name, price)')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Dashboard Fetch Error:", error.message)
  }

  return (
    <div className="min-h-screen font-sans bg-[#F9F8F6] text-[#0F1F15] selection:bg-[#4A7C59] selection:text-white">
      <Navbar />
      <BookingsDashboard bookings={(bookings as any[]) || []} userEmail={user.email ?? ''} />
    </div>
  )
}
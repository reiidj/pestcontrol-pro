import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import AdminChart from '@/components/AdminChart'
import { ArrowLeft } from 'lucide-react'

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.app_metadata?.role !== 'admin') redirect('/')

  const { data: orders } = await supabase
    .from('orders')
    .select('created_at, services(price)')
    .eq('status', 'completed')

  return (
    <div className="min-h-screen bg-[#F9F7F2] p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        
        <div className="mb-10">
          <h1 className="text-4xl font-black text-[#0F1F15] tracking-tight">Business Analytics</h1>
          <p className="text-[#6B7A6E] mt-2">Performance metrics and revenue trends.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-[#E8E4DC] shadow-[0_4px_20px_-4px_rgba(15,31,21,0.05)]">
          <h2 className="font-bold mb-8">Revenue Growth</h2>
          <div className="h-[400px]">
            <AdminChart orders={orders || []} />
          </div>
        </div>
      </div>
    </div>
  )
}
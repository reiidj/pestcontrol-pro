import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { TrendingUp, DollarSign, Target, Activity } from 'lucide-react'
import AnalyticsDashboard from '@/components/admin/AnalyticsDashboard'

// 1. Define the exact shape of our joined Supabase data to satisfy TypeScript
type AnalyticsOrder = {
  id: string
  created_at: string
  status: string
  total_price: number | null // Changed from final_price
  property_size: string | null
  profiles: { email: string } | { email: string }[] | null
  services: { name: string; price: number } | { name: string; price: number }[] | null
}

// 2. Safe extraction helpers (Handles both Objects and Arrays from Supabase joins)
const getEmail = (profiles: AnalyticsOrder['profiles']) => {
  if (!profiles) return 'Guest'
  return Array.isArray(profiles) ? profiles[0]?.email : profiles.email
}

const getServiceName = (services: AnalyticsOrder['services']) => {
  if (!services) return 'Custom Package'
  return Array.isArray(services) ? services[0]?.name : services.name
}

const getServicePrice = (services: AnalyticsOrder['services']) => {
  if (!services) return 0
  return Array.isArray(services) ? services[0]?.price : services.price
}

export default async function AnalyticsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.app_metadata?.role !== 'admin') redirect('/')

  // Fetch all relevant orders with joined data (Changed final_price to total_price here)
  const { data: orders, error } = await supabase
    .from('orders')
    .select('id, created_at, status, total_price, property_size, profiles(email), services(name, price)')
    .neq('status', 'cancelled')
    .order('created_at', { ascending: false })

  if (error) console.error("Analytics DB Error:", error)

  // Cast the untyped Supabase response to our strict TypeScript interface
  const validOrders = (orders as unknown as AnalyticsOrder[]) || []

  // --- DATA AGGREGATION ---
  
  // 1. KPI Metrics
  const totalRevenue = validOrders.reduce((sum, order) => sum + (order.total_price || getServicePrice(order.services)), 0)
  const completedOrders = validOrders.filter(o => o.status === 'completed')
  const avgOrderValue = completedOrders.length > 0 ? totalRevenue / completedOrders.length : 0
  const completionRate = validOrders.length > 0 ? (completedOrders.length / validOrders.length) * 100 : 0

  // 2. Package Popularity (Donut Chart Data)
  const serviceCounts = validOrders.reduce((acc: Record<string, number>, order) => {
    const name = getServiceName(order.services)
    acc[name] = (acc[name] || 0) + 1
    return acc
  }, {})
  const packageData = Object.keys(serviceCounts).map(key => ({ name: key, value: serviceCounts[key] }))

  // 3. Property Size Distribution (Bar Chart Data)
  const sizeCounts = validOrders.reduce((acc: Record<string, number>, order) => {
    const size = order.property_size || 'Unknown' 
    acc[size] = (acc[size] || 0) + 1
    return acc
  }, {})
  const sizeData = Object.keys(sizeCounts).map(key => ({ name: key.toUpperCase(), count: sizeCounts[key] }))

  // 4. Revenue Over Time (Line Chart Data)
  const monthlyRevenue = validOrders.reduce((acc: Record<string, number>, order) => {
    const date = new Date(order.created_at)
    const monthYear = date.toLocaleString('default', { month: 'short', year: 'numeric' })
    const price = order.total_price || getServicePrice(order.services)
    acc[monthYear] = (acc[monthYear] || 0) + price
    return acc
  }, {})
  const revenueData = Object.keys(monthlyRevenue).reverse().map(key => ({ date: key, revenue: monthlyRevenue[key] }))

  // 5. Recent Transactions (Table Data)
  const recentOrders = validOrders.slice(0, 5)

  return (
    <>
      <header className="mb-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2 text-[#4A7C59]">
          Performance Metrics
        </p>
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F1F15]">
          Business Analytics
        </h1>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Revenue', value: `$${totalRevenue.toLocaleString()}`, icon: DollarSign, color: '#4A7C59', bg: '#EBF2ED' },
          { label: 'Avg Order Value', value: `$${Math.round(avgOrderValue)}`, icon: TrendingUp, color: '#D97706', bg: '#FFFBEB' },
          { label: 'Active Bookings', value: validOrders.length, icon: Target, color: '#C8A96E', bg: '#FDF8EF' },
          { label: 'Completion Rate', value: `${Math.round(completionRate)}%`, icon: Activity, color: '#6B7A6E', bg: '#E8E4DC' }
        ].map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-[0_2px_12px_-4px_rgba(15,31,21,0.04)]">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7A6E]">{kpi.label}</span>
              <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: kpi.bg, color: kpi.color }}>
                <kpi.icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl font-black text-[#0F1F15]">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Client Component: Interactive Charts */}
      <AnalyticsDashboard revenueData={revenueData} packageData={packageData} sizeData={sizeData} />

      {/* Recent Transactions Table */}
      <div className="mt-8 bg-white rounded-2xl border border-[#E8E4DC] shadow-[0_2px_12px_-4px_rgba(15,31,21,0.04)] overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E8E4DC]">
          <h2 className="text-sm font-bold text-[#0F1F15]">Recent Transactions</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F9F7F2]/50 border-b border-[#E8E4DC]">
              <tr>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Date</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Customer</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Package</th>
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E] text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id} className="border-b border-[#E8E4DC] last:border-0 hover:bg-[#F9F7F2]/30 transition-colors">
                  <td className="px-6 py-4 text-sm font-medium text-[#6B7A6E]">
                    {new Date(order.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>
                  <td className="px-6 py-4 text-sm font-bold text-[#0F1F15]">{getEmail(order.profiles)}</td>
                  <td className="px-6 py-4 text-sm text-[#4A7C59] font-medium">{getServiceName(order.services)}</td>
                  <td className="px-6 py-4 text-sm font-black text-[#0F1F15] text-right">
                    ${order.total_price || getServicePrice(order.services)}
                  </td>
                </tr>
              ))}
              {recentOrders.length === 0 && (
                 <tr>
                    <td colSpan={4} className="px-6 py-10 text-center text-sm font-bold text-gray-400">No recent transactions found.</td>
                 </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
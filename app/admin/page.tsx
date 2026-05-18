import { createClient } from '@/utils/supabase/server'
import { updateOrderStatus } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import { OrderWithRelations } from '@/types/database'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // 1. Verify Admin Status
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.app_metadata?.role !== 'admin') {
    redirect('/')
  }

  // 2. Fetch Orders with clean typing applied
  const { data, error } = await supabase
    .from('orders')
    .select('id, status, created_at, profiles(email), services(name, price)')
    .order('created_at', { ascending: false })

  if (error) {
    console.error("Supabase Query Error:", error.message)
  }

  // Cast the data safely to our structural interface type
  const orders: OrderWithRelations[] = (data as unknown as OrderWithRelations[]) || []

  // 3. Calculate Total Revenue safely without any TS warnings
  const totalRevenue = orders
    .filter((order) => order.status === 'completed')
    .reduce((sum, order) => sum + (order.services?.price || 0), 0)

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
    <div className="min-h-screen bg-slate-50">
      {/* Admin Sidebar/Nav */}
      <nav className="bg-white border-b border-slate-200 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="flex items-center gap-4">
          <span className="text-xl font-bold text-slate-900">Admin Portal</span>
          <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded uppercase tracking-wider">
            Control Panel
          </span>
        </div>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800">View Site</Link>
          <div className="h-6 w-px bg-slate-200"></div>
          <span className="text-sm font-semibold text-slate-700">{user.email}</span>
        </div>
        <div className="flex items-center gap-6">
        <Link href="/" className="text-sm font-medium text-slate-500 hover:text-slate-800">View Site</Link>
        <div className="h-6 w-px bg-slate-200"></div>
        <span className="text-sm font-semibold text-slate-700">{user.email}</span>
        
        <SignOutButton /> {/* Drop it in here */}
      </div>
      </nav>

      <main className="max-w-7xl mx-auto px-8 py-10">
        {/* Header Stats */}
        <header className="mb-10">
          <h1 className="text-3xl font-bold text-slate-900">Order Management</h1>
          <p className="text-slate-900 mt-1">Track and update customer pest control requests.</p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          <StatCard title="Total Orders" value={orders?.length || 0} color="blue" />
          <StatCard title="Pending" value={orders?.filter(o => o.status === 'pending').length || 0} color="yellow" />
          <StatCard title="Completed" value={orders?.filter(o => o.status === 'completed').length || 0} color="green" />
          
          {/* FIXED: Now dynamically displays total revenue formatted to 2 decimal places */}
          <StatCard title="Revenue" value={`$${totalRevenue.toFixed(2)}`} color="slate" />
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Order ID</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Customer</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Service</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Date</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-slate-50 transition-colors">

                    <td className="px-6 py-4 text-sm font-mono text-slate-500">
                      #{order.id.slice(0, 8)}
                    </td>

                    <td className="px-6 py-4 text-sm font-medium text-slate-900">
                      {order.profiles?.email}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-700 font-semibold">
                      {order.services?.name || 'Unknown Service'}
                    </td>

                    <td className="px-6 py-4">
                      {(() => {
                        const status = (order.status || 'pending') as keyof typeof STATUS_STYLES;
                        const config = STATUS_STYLES[status];
                        
                        return (
                          <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-bold border ${config.bg}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />
                            {config.label}
                          </span>
                        );
                      })()}
                    </td>

                    <td className="px-6 py-4 text-sm text-slate-900">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {/* @ts-expect-error - Next.js handles server action return values natively */}
                      <form action={updateOrderStatus} className="inline-flex items-center gap-2 justify-end w-full">
                        <input type="hidden" name="orderId" value={order.id} />
                        <select name="status" defaultValue={order.status} className="...">
                          <option value="pending">Pending</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="completed">Completed</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                        <button type="submit" className="...">Save</button>
                      </form>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-900 italic">
                    No orders found in the system.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}

// Small Helper Component for Stats
function StatCard({ title, value, color }: { title: string, value: number | string, color: string }) {
  const colors: Record<string, string> = {
    blue: "text-blue-600 bg-blue-50",
    yellow: "text-yellow-600 bg-yellow-50",
    green: "text-green-600 bg-green-50",
    slate: "text-slate-600 bg-slate-50"
  }
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
      <p className="text-sm font-semibold text-slate-500 mb-1">{title}</p>
      <p className={`text-3xl font-black ${colors[color].split(' ')[0]}`}>{value}</p>
    </div>
  )
}
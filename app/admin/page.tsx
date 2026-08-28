import { createClient } from '@/utils/supabase/server'
import { updateOrderStatus } from '@/app/auth/actions'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import { OrderWithRelations } from '@/types/database'
import { BarChart3 } from 'lucide-react'
import OrderFilters from '@/components/admin/OrderFilters'

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; date?: string }>
}) {
  const params = await searchParams // Read URL parameters
  const searchTerm = params.search?.toLowerCase() || ''
  const filterDate = params.date || ''

  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.app_metadata?.role !== 'admin') redirect('/')

  const { data, error } = await supabase
    .from('orders')
    .select('id, status, created_at, scheduled_date, profiles(email), services(name, price)')
    .order('created_at', { ascending: false })

  let orders: OrderWithRelations[] = (data as unknown as OrderWithRelations[]) || []

  // 1. Calculate stats BEFORE filtering (so stats always show the grand total)
  const totalRevenue = orders
    .filter((order) => order.status === 'completed')
    .reduce((sum, order) => sum + (order.services?.price || 0), 0)
    
  const totalOrdersCount = orders.length
  const pendingCount = orders.filter(o => o.status === 'pending').length
  const completedCount = orders.filter(o => o.status === 'completed').length

  // 2. Apply Filters to the orders array
  if (searchTerm) {
    orders = orders.filter((order) => 
      order.id.toLowerCase().includes(searchTerm) || 
      (order.profiles?.email || '').toLowerCase().includes(searchTerm)
    )
  }

  if (filterDate) {
    orders = orders.filter((order) => 
      order.created_at.startsWith(filterDate) // created_at is ISO string, so startsWith matches YYYY-MM-DD safely
    )
  }

  const STATUS_STYLES = {
    pending: {
      bg: 'bg-amber-50 border-amber-200 text-amber-700',
      dot: 'bg-amber-400',
      label: 'Pending',
      rail: '#D97706',
      badge: { bg: '#FFFBEB', border: '#FDE68A', text: '#92400E' },
    },
    scheduled: {
      bg: 'bg-blue-50 border-blue-200 text-blue-700',
      dot: 'bg-blue-500',
      label: 'Scheduled',
      rail: '#4A7C59',
      badge: { bg: '#EBF2ED', border: '#C4D9CA', text: '#1B4332' },
    },
    completed: {
      bg: 'bg-emerald-50 border-emerald-200 text-emerald-700',
      dot: 'bg-emerald-500',
      label: 'Completed',
      rail: '#C8A96E',
      badge: { bg: '#FDF8EF', border: '#E9D5A1', text: '#78490A' },
    },
    cancelled: {
      bg: 'bg-slate-100 border-slate-200 text-slate-600',
      dot: 'bg-slate-400',
      label: 'Cancelled',
      rail: '#94A3B8',
      badge: { bg: '#F8FAFC', border: '#E2E8F0', text: '#64748B' },
    },
  } as const

  const statCards = [
    {
      title: 'Total Orders',
      value: totalOrdersCount,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0ZM3.75 12h.007v.008H3.75V12Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm-.375 5.25h.007v.008H3.75v-.008Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
        </svg>
      ),
      accent: '#4A7C59',
      accentBg: '#EBF2ED',
    },
    {
      title: 'Pending',
      value: pendingCount,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      accent: '#D97706',
      accentBg: '#FFFBEB',
    },
    {
      title: 'Completed',
      value: completedCount,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      ),
      accent: '#C8A96E',
      accentBg: '#FDF8EF',
    },
    {
      title: 'Revenue',
      value: `$${totalRevenue.toFixed(2)}`,
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
        </svg>
      ),
      accent: '#0F1F15',
      accentBg: '#E8E4DC',
    },
  ]

  return (
    <div
      className="min-h-screen font-sans"
      style={{ backgroundColor: '#F9F7F2', color: '#0F1F15' }}
    >
      {/* ─── GLOBAL STYLES ──────────────────────────────────────────────── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');

        :root {
          --forest:   #0F1F15;
          --ivory:    #F9F7F2;
          --sage:     #4A7C59;
          --sage-lt:  #EBF2ED;
          --sage-mid: #C4D9CA;
          --gold:     #C8A96E;
          --fog:      #E8E4DC;
          --muted:    #6B7A6E;
        }

        * { box-sizing: border-box; }
        body { font-family: 'Inter', system-ui, sans-serif; }

        .order-row { transition: background 0.15s; }
        .order-row:hover { background: rgba(15,31,21,0.025); }

        .save-btn {
          transition: background 0.15s, box-shadow 0.15s;
        }
        .save-btn:hover {
          background: #3D6B4A;
          box-shadow: 0 4px 12px -2px rgba(74,124,89,0.35);
        }

        .status-select {
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236B7A6E'%3E%3Cpath fill-rule='evenodd' d='M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z' clip-rule='evenodd' /%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 8px center;
          background-size: 16px;
          padding-right: 28px;
          transition: border-color 0.15s, box-shadow 0.15s;
        }
        .status-select:focus {
          outline: none;
          border-color: var(--sage);
          box-shadow: 0 0 0 3px rgba(74,124,89,0.12);
        }

        @media (prefers-reduced-motion: reduce) {
          .order-row, .save-btn { transition: none; }
        }
      `}</style>

      {/* ─── MAIN ───────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 md:px-8 py-10">

        {/* Page header */}
        <header className="mb-10">
          <p
            className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2"
            style={{ color: 'var(--sage)' }}
          >
            Order Management
          </p>
          <h1
            className="text-3xl md:text-4xl font-black tracking-tight"
            style={{ color: 'var(--forest)' }}
          >
            All Bookings
          </h1>
          <p className="text-sm mt-1.5" style={{ color: 'var(--muted)' }}>
            Track and update customer pest control requests in real time.
          </p>
        </header>

        {/* ── Stat cards ─────────────────────────────────────────────── */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {statCards.map((card) => (
            <div
              key={card.title}
              className="rounded-2xl p-5"
              style={{
                background: '#FFFFFF',
                border: '1px solid var(--fog)',
                boxShadow: '0 1px 6px -1px rgba(15,31,21,0.05)',
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <p
                  className="text-[11px] font-bold uppercase tracking-wider"
                  style={{ color: 'var(--muted)' }}
                >
                  {card.title}
                </p>
                <div
                  className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: card.accentBg, color: card.accent }}
                >
                  {card.icon}
                </div>
              </div>
              <p
                className="text-3xl font-black tracking-tight leading-none"
                style={{ color: card.accent }}
              >
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* ── Filters Component ────────────────────────────────────────────── */}
        <OrderFilters />

        {/* ── Orders table ────────────────────────────────────────────── */}
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: '#FFFFFF',
            border: '1px solid var(--fog)',
            boxShadow: '0 2px 12px -2px rgba(15,31,21,0.06)',
          }}
        >
          {/* Table header */}
          <div
            className="px-6 py-4 flex items-center justify-between"
            style={{ borderBottom: '1px solid var(--fog)' }}
          >
            <h2 className="text-sm font-bold" style={{ color: 'var(--forest)' }}>
              Order Queue
            </h2>
            <span
              className="text-xs font-semibold px-2.5 py-1 rounded-full"
              style={{
                background: 'var(--sage-lt)',
                color: 'var(--sage)',
                border: '1px solid var(--sage-mid)',
              }}
            >
              {orders.length} {orders.length === 1 ? 'order' : 'orders'}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr style={{ borderBottom: '1px solid var(--fog)', background: 'rgba(15,31,21,0.018)' }}>
                  {['Order ID', 'Customer', 'Service', 'Status', 'Scheduled Date', 'Update Status'].map((h, i) => (
                    <th
                      key={h}
                      className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest"
                      style={{
                        color: 'var(--muted)',
                        textAlign: i === 5 ? 'right' : 'left',
                      }}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? (
                  orders.map((order, idx) => {
                    const status = (order.status || 'pending') as keyof typeof STATUS_STYLES
                    const config = STATUS_STYLES[status]

                    return (
                      <tr
                        key={order.id}
                        className="order-row"
                        style={{
                          borderBottom: idx < orders.length - 1 ? '1px solid var(--fog)' : 'none',
                        }}
                      >
                        {/* Order ID */}
                        <td className="px-6 py-4">
                          <span
                            className="text-xs font-mono font-semibold px-2 py-1 rounded"
                            style={{
                              background: 'var(--fog)',
                              color: 'var(--muted)',
                              letterSpacing: '0.05em',
                            }}
                          >
                            #{order.id.slice(0, 8).toUpperCase()}
                          </span>
                        </td>

                        {/* Customer */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2.5">
                            <div
                              className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0"
                              style={{ background: 'var(--sage-lt)', color: 'var(--sage)' }}
                            >
                              {order.profiles?.email?.[0]?.toUpperCase() ?? '?'}
                            </div>
                            <span className="text-sm font-medium truncate max-w-[160px]" style={{ color: 'var(--forest)' }}>
                              {order.profiles?.email}
                            </span>
                          </div>
                        </td>

                        {/* Service */}
                        <td className="px-6 py-4">
                          <span className="text-sm font-semibold" style={{ color: 'var(--forest)' }}>
                            {order.services?.name || 'Unknown Service'}
                          </span>
                          {order.services?.price && (
                            <p className="text-xs mt-0.5" style={{ color: 'var(--muted)' }}>
                              ${order.services.price}
                            </p>
                          )}
                        </td>

                        {/* Status badge */}
                        <td className="px-6 py-4">
                          {(() => {
                            const s = (order.status || 'pending') as keyof typeof STATUS_STYLES
                            const c = STATUS_STYLES[s]
                            return (
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border ${c.bg}`}
                                style={{
                                  background: c.badge.bg,
                                  borderColor: c.badge.border,
                                  color: c.badge.text,
                                }}
                              >
                                <span
                                  className={`w-1.5 h-1.5 rounded-full shrink-0 ${c.dot}`}
                                  style={{ background: c.rail }}
                                />
                                {c.label}
                              </span>
                            )
                          })()}
                        </td>

                        {/* Date */}
                        <td className="px-6 py-4 text-sm" style={{ color: 'var(--muted)' }}>
                          {order.scheduled_date
                            ? new Date(order.scheduled_date).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric',
                              })
                            : 'Not scheduled'}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          {/* @ts-expect-error - Next.js handles server action return values natively */}
                          <form action={updateOrderStatus} className="flex items-center gap-2 justify-end">
                            <input type="hidden" name="orderId" value={order.id} />
                            <select
                              name="status"
                              defaultValue={order.status}
                              className="status-select text-xs font-semibold rounded-lg px-3 py-2 cursor-pointer"
                              style={{
                                background: '#FFFFFF',
                                border: '1px solid var(--fog)',
                                color: 'var(--forest)',
                                minWidth: '120px',
                              }}
                            >
                              <option value="pending">Pending</option>
                              <option value="scheduled">Scheduled</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <button
                              type="submit"
                              className="save-btn text-xs font-bold px-3 py-2 rounded-lg shrink-0"
                              style={{
                                background: 'var(--sage)',
                                color: '#FFFFFF',
                              }}
                            >
                              Save
                            </button>
                          </form>
                        </td>
                      </tr>
                    )
                  })
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-16 text-center">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-4"
                        style={{ background: 'var(--sage-lt)' }}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" style={{ color: 'var(--sage)' }}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 12h16.5m-16.5 3.75h16.5M3.75 19.5h16.5M5.625 4.5h12.75a1.875 1.875 0 0 1 0 3.75H5.625a1.875 1.875 0 0 1 0-3.75Z" />
                        </svg>
                      </div>
                      <p className="text-sm font-semibold" style={{ color: 'var(--forest)' }}>No orders yet</p>
                      <p className="text-xs mt-1" style={{ color: 'var(--muted)' }}>
                        New bookings from the landing page will appear here.
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}

// Small Helper Component for Stats — preserved, no longer used directly (inlined above for design control)
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
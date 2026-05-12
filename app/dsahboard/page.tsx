import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'

export default async function CustomerDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  // Fetch only THIS user's orders
  const { data: myOrders } = await supabase
    .from('orders')
    .select(`
      id,
      status,
      created_at,
      services (
        name,
        price
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-start mb-12">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Bookings</h1>
            <p className="text-gray-500">Manage your scheduled pest control services.</p>
            <Link href="/" className="text-sm text-blue-600 hover:underline mt-2 inline-block">
              ← Back to Home
            </Link>
          </div>
          <div className="text-right flex flex-col items-end gap-2">
            <div>
              <p className="text-sm font-medium text-gray-900">{user.email}</p>
              <p className="text-xs text-gray-400 font-mono">ID: {user.id.slice(0, 8)}</p>
            </div>
            <SignOutButton />
          </div>
        </header>

        {myOrders && myOrders.length > 0 ? (
          <div className="space-y-4">
            {myOrders.map((order) => (
              <div key={order.id} className="flex items-center justify-between p-6 border border-gray-100 rounded-2xl bg-gray-50/50">
                <div>
                  {/* @ts-expect-error nested data */}
                  <h3 className="font-bold text-gray-900">{order.services?.name}</h3>
                  <p className="text-sm text-gray-500">Ordered on {new Date(order.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-6">
                  {/* @ts-expect-error nested data */}
                  <span className="font-bold text-blue-600">${order.services?.price}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                    order.status === 'completed' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-gray-100 rounded-3xl">
            <p className="text-gray-400">You haven't booked any services yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
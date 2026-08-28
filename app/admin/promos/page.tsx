import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import SignOutButton from '@/components/SignOutButton'
import { BarChart3, Ticket } from 'lucide-react'
import { createPromoCode, togglePromoStatus } from '@/app/auth/actions'

export default async function AdminPromos() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (user?.app_metadata?.role !== 'admin') redirect('/')

  // Fetch all promo codes, ordered by newest first
  const { data: promos } = await supabase
    .from('promo_codes')
    .select('*')
    .order('created_at', { ascending: false })

  return (
    <div className="min-h-screen font-sans" style={{ backgroundColor: '#F9F7F2', color: '#0F1F15' }}>

      <main className="max-w-7xl mx-auto px-6 md:px-8 py-10">
        <header className="mb-10">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] mb-2" style={{ color: 'var(--sage)' }}>
            Marketing Operations
          </p>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight" style={{ color: 'var(--forest)' }}>
            Manage Promo Codes
          </h1>
        </header>

        <div className="grid md:grid-cols-3 gap-8">
          
          {/* Create New Promo Form */}
          <div className="md:col-span-1 h-fit bg-white p-6 rounded-2xl border border-[#E8E4DC] shadow-sm">
            <h3 className="text-sm font-bold uppercase tracking-widest text-[#0F1F15] mb-6">Create New Promo</h3>
            <form action={createPromoCode} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Code Name</label>
                <input 
                  type="text" 
                  name="code" 
                  required 
                  placeholder="e.g., SUMMER50"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#4A7C59] uppercase"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Discount Decimal (e.g., 0.50 for 50%)</label>
                <input 
                  type="number" 
                  name="discountPercent" 
                  step="0.01"
                  max="1.00"
                  min="0.01"
                  required 
                  placeholder="0.30"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#4A7C59]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">Expiration Date (Optional)</label>
                <input 
                  type="date" 
                  name="expiresAt" 
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-sm focus:ring-[#4A7C59]"
                />
              </div>
              <button 
                type="submit" 
                className="w-full py-3 bg-[#0F1F15] text-white rounded-lg text-sm font-bold uppercase tracking-widest hover:bg-[#4A7C59] transition-colors"
              >
                Create Promo
              </button>
            </form>
          </div>

          {/* Promo Codes Table */}
          <div className="md:col-span-2 bg-white rounded-2xl border border-[#E8E4DC] shadow-sm overflow-hidden">
            <div className="px-6 py-4 border-b border-[#E8E4DC]">
              <h2 className="text-sm font-bold text-[#0F1F15]">Active & Past Campaigns</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-[#F9F7F2]/50 border-b border-[#E8E4DC]">
                  <tr>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Code</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Discount</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Status</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E]">Expires</th>
                    <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E] text-right">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {promos && promos.map((promo) => (
                    <tr key={promo.code} className="border-b border-[#E8E4DC] last:border-0 hover:bg-[#F9F7F2]/30 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-sm">{promo.code}</td>
                      <td className="px-6 py-4 text-sm font-medium text-[#4A7C59]">
                        {(promo.discount_percent * 100).toFixed(0)}% Off
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider ${promo.is_active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>
                          {promo.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {promo.expires_at ? new Date(promo.expires_at).toLocaleDateString() : 'Never'}
                      </td>
                      <td className="px-6 py-4 text-right">
                        {/* Toggle Status Button */}
                        <form action={togglePromoStatus}>
                          <input type="hidden" name="code" value={promo.code} />
                          <input type="hidden" name="currentState" value={promo.is_active.toString()} />
                          <button 
                            type="submit"
                            className="text-xs font-bold text-[#6B7A6E] hover:text-[#0F1F15] underline decoration-[#6B7A6E]/30 underline-offset-4"
                          >
                            {promo.is_active ? 'Deactivate' : 'Activate'}
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))}
                  {!promos?.length && (
                    <tr>
                      <td colSpan={5} className="px-6 py-10 text-center text-sm text-gray-500">No promo codes found. Create one to get started.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}
import { createClient } from '@/utils/supabase/server'
import { createOrder } from '@/app/auth/actions'
import Navbar from '@/components/NavBar'  
import Link from 'next/link'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: services } = await supabase.from('services').select('*')

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900"> {/* FIXED: Added opening fragment wrapper so components can coexist side by side */}
      <Navbar /> {/* Global NavBar */}

      {/* Hero Section */}
      <header className="py-20 px-6 text-center">
        <h2 className="text-5xl font-extrabold text-gray-900 mb-4">
          Expert Pest Control Services
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          From ants to rodents, we provide professional solutions to keep your home safe and pest-free.
        </p>
      </header>

      {/* Services Grid */}
      <main className="max-w-6xl mx-auto px-6 pb-20">
        <h3 className="text-3xl font-bold mb-8 text-gray-800">Our Services</h3>
        <div className="grid md:grid-cols-3 gap-8">
          {services?.map((service) => (
            <div key={service.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              {/* Card Body */}
              <div>
                <h4 className="text-xl font-bold mb-2 text-gray-900">{service.name}</h4>
                <p className="text-gray-600 mb-6 text-sm leading-relaxed">{service.description}</p>
              </div>

              {/* Bottom Interactive Area */}
              <div className="mt-auto border-t border-gray-50 pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Price</span>
                  <span className="text-2xl font-black text-blue-600">${service.price}</span>
                </div>
                
                {/* Interactive Two-Step Panel using Native Details */}
                <details className="group [&_summary::-webkit-details-marker]:hidden">
                  <summary className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition shadow-sm text-center cursor-pointer list-none flex justify-center items-center group-open:hidden">
                    Order Now →
                  </summary>

                  {/* This section reveals fluidly only after "Order Now" is pressed */}
                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-slate-700 uppercase tracking-wide">Configure Schedule</span>
                      
                      {/* FIXED: Using a summary tag as a button inside here acts as a native toggle to close it! */}
                      <summary className="text-xs font-semibold text-slate-400 hover:text-slate-600 cursor-pointer list-none">
                        Cancel
                      </summary>
                    </div>

                    {/* @ts-expect-error - Next.js handles server action forms natively */}
                    <form action={createOrder} className="space-y-3">
                      <input type="hidden" name="serviceId" value={service.id} />
                      
                      <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">
                          Select Preferred Date
                        </label>
                        <input 
                          type="date" 
                          name="scheduledDate"
                          required
                          min={new Date().toISOString().split('T')[0]} 
                          className="w-full px-3 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium text-gray-700"
                        />
                      </div>

                      <button 
                        type="submit" 
                        className="w-full py-2 bg-emerald-600 text-white rounded-lg font-bold text-xs uppercase tracking-wider hover:bg-emerald-700 transition shadow-xs text-center"
                      >
                        Confirm & Book Appointment
                      </button>
                    </form>
                  </div>
                </details>
              </div>
            </div>
          ))}
        </div>
      </main> 
    </div>
  )
}
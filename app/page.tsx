import { createClient } from '@/utils/supabase/server'
import Link from 'next/link'

export default async function LandingPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  const { data: services } = await supabase.from('services').select('*')

  return (
    <div className="min-h-screen bg-white">
      <nav className="flex items-center justify-between px-8 py-6 border-b">
        <span className="text-xl font-bold text-blue-600">PestControl Pro</span>
        <div className="space-x-6 flex items-center">
          <Link href="#services" className="text-gray-600">Services</Link>
          
          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">{user.email}</span>
              <Link href="/app" className="text-blue-600 font-medium">My Bookings</Link>
            </div>
          ) : (
            <Link href="/login" className="px-5 py-2 bg-blue-600 text-white rounded-full">
              Login
            </Link>
          )}
        </div>
      </nav>

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
            <div key={service.id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg transition">
              <h4 className="text-xl font-bold mb-2">{service.name}</h4>
              <p className="text-gray-600 mb-4 text-sm">{service.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-2xl font-bold text-blue-900">${service.price}</span>
                <Link href="/login" className="text-blue-600 font-semibold hover:underline">
                  Order Now →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
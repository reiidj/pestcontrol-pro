import Link from 'next/link'

const SERVICE_TIERS = [
  {
    id: '11111111-1111-4111-8111-111111111111', 
    name: 'Exterior Perimeter Shield',
    target: 'Preventative / Budget',
    description: 'Exterior foundation barrier, wasp nest removal, basic yard perimeter.',
    price: 89,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    name: 'Complete Home Protection',
    target: 'Standard Residential',
    description: 'Tier 1 + Interior treatment, rodent monitoring stations, roach/ant control.',
    price: 129,
    image: "https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=1000&auto=format&fit=crop"
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    name: 'Premium Eco-Guard',
    target: 'Premium / Families',
    description: 'Tier 2 + Mosquito/Tick yard fogging, eco-botanical indoor treatments.',
    price: 189,
    image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop"
  }
]

export default function Services() {
  return (
    <main id="services" className="max-w-7xl mx-auto px-6 py-32 bg-[#FFFDF7]">
      <div className="text-center mb-16">
        <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#166534] mb-3">
          Field Assessment Menu
        </p>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#171717] mb-4">
          Choose your protection tier
        </h2>
        <p className="text-base text-gray-500 max-w-xl mx-auto">
          Flat transparent rates. Background-vetted, certified field operators. Safe for families, pets, and local ecosystems.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {SERVICE_TIERS.map((tier, index) => (
          <div key={tier.id} className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-[0_24px_48px_-12px_rgba(22,101,52,0.15)] hover:-translate-y-1 hover:border-[#166534]/30 transition-all duration-300">
            <div className="relative h-48 overflow-hidden">
              <div className={`absolute top-0 left-0 w-full h-1 z-10 ${index % 2 === 1 ? 'bg-[#4ADE80]' : 'bg-[#166534]'}`} />
              <img src={tier.image} alt={tier.name} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90" />
            </div>

            <div className="p-7 flex flex-col justify-between flex-1 relative -mt-12">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[0.65rem] font-black font-mono tracking-widest text-[#166534] bg-white px-2 py-1 rounded shadow-sm border border-[#F0FDF4]">
                    TIER {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.6rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#166534]">
                    {tier.target}
                  </span>
                </div>
                <h3 className="text-2xl font-bold tracking-tight text-[#171717] mb-3">{tier.name}</h3>
                <div className="text-[0.9rem] leading-relaxed text-gray-500 min-h-[4.5rem]">
                  {tier.description.split(', ').map((feature, i) => (
                    <div key={i} className="flex items-start gap-2 mb-1.5">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 text-[#4ADE80] shrink-0 mt-0.5">
                        <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z" clipRule="evenodd" />
                      </svg>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <div className="flex justify-between items-end mb-6">
                  <div className="flex flex-col">
                    <span className="text-[0.7rem] font-bold uppercase tracking-widest text-gray-400">Starts At</span>
                    <span className="text-[0.6rem] font-medium text-gray-400 mt-1">Up to 1,500 sq ft</span>
                  </div>
                  <div className="flex items-start">
                    <span className="text-sm font-bold text-[#166534] mt-1 mr-0.5">$</span>
                    <span className="text-4xl font-black tracking-tight text-[#171717] leading-none">{tier.price}</span>
                  </div>
                </div>
                <Link 
                  href={`/checkout?serviceId=${tier.id}`}
                  className="w-full py-3.5 rounded-xl font-bold text-[0.85rem] text-center cursor-pointer select-none flex justify-center items-center gap-2 bg-[#171717] text-white hover:bg-[#166534] transition-colors"
                >
                  Configure & Book
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-60">
                    <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
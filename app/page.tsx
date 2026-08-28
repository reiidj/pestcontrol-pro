import { createClient } from '@/utils/supabase/server'
import { createOrder } from '@/app/auth/actions'
import Navbar from '@/components/NavBar'
import Link from 'next/link'

export default async function LandingPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>
}) {
  const params = await searchParams
  const errorMessage = params.error

  const supabase = await createClient()
  const { data: services } = await supabase.from('services').select('*')

  // Premium stock images mapped to our services to enhance visual appeal
  const SERVICE_IMAGES = [
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop", // Clean Home Exterior
    "https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=1000&auto=format&fit=crop", // Safe Interior/Eco
    "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop", // Commercial/Modern Architecture
  ]

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
  
  // Curated Review Data
  const REVIEWS = [
    {
      name: "Sarah Jenkins",
      role: "GM, The Rustic Spoon",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
      text: "The digital booking is flawless. No sales calls, just immediate service. Our restaurant has never been cleaner, and the digital logs make health inspections a breeze."
    },
    {
      name: "David Chen",
      role: "Homeowner",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
      text: "Worth every penny. The technician was incredibly professional, and the transparent flat-rate pricing saved us from the usual industry upsells."
    },
    {
      name: "Elena Rostova",
      role: "Property Manager",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=150&auto=format&fit=crop",
      text: "Enterprise-grade reporting is a game changer for our property management firm. I can track treatments across 14 properties from one dashboard."
    },
    {
      name: "Marcus Thorne",
      role: "Operations Director",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=150&auto=format&fit=crop",
      text: "We switched our entire corporate campus to NestGuard. The micro-encapsulation tech actually works without the toxic smell of traditional sprays."
    },
    {
      name: "Jessica L.",
      role: "Mother of 3",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
      text: "Finally, a pest control company that understands eco-safe treatments. My kids and dog are completely safe, and the ants are completely gone."
    }
  ]

  return (
    <div className="min-h-screen font-sans bg-[#FFFDF7] text-[#171717] selection:bg-[#166534] selection:text-white pb-0">
      
      {/* ─── SCROLL ANIMATION STYLES ───────────────────────────────────────── */}
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          animation: marquee 40s linear infinite;
          will-change: transform;
        }
        .pause-marquee:hover .animate-marquee {
          animation-play-state: paused;
        }
      `}</style>

      {/* ─── NAVBAR ────────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ─── ERROR BANNER ──────────────────────────────────────────────────── */}
      {errorMessage && (
        <div className="max-w-4xl mx-auto mt-6 px-5 py-4 rounded-xl flex items-center gap-3 text-sm font-medium bg-[#FFF0F0] border border-[#FECDCD] text-[#9B1C1C] shadow-sm relative z-50">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 shrink-0">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
          </svg>
          <span>{decodeURIComponent(errorMessage)}</span>
        </div>
      )}

      {/* ─── PREMIUM SYMMETRICAL HERO ──────────────────────────────────────── */}
      <header className="relative bg-gradient-to-b from-[#171717] via-[#1c1c1c] to-[#171717] overflow-hidden border-b border-[#166534]/30">
        
        {/* Ambient Mesh Glows */}
        <div className="absolute inset-0 pointer-events-none flex justify-center" aria-hidden>
          <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-[#166534]/15 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 left-10 w-[600px] h-[600px] bg-[#4ADE80]/10 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <h1 className="text-5xl lg:text-[72px] font-black leading-[1.05] tracking-tight text-[#FFFDF7] mb-6">
              Pest control that{' '}
              <em className="not-italic bg-gradient-to-r from-[#4ADE80] to-[#166534] bg-clip-text text-transparent">
                books itself.
              </em>
            </h1>

            <p className="text-lg lg:text-xl leading-relaxed text-[#FFFDF7]/70 max-w-xl mx-auto lg:mx-0 mb-10">
              Premium residential and commercial treatment — flat rates, zero sales calls. Choose a plan, select a date, and secure your property in under a minute.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[0.9rem] font-bold text-white bg-gradient-to-b from-[#166534] to-[#14532d] shadow-[0_4px_20px_rgba(22,101,52,0.3)] hover:shadow-[0_8px_30px_rgba(22,101,52,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                View Service Plans
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69L5.22 13.72a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#standards"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-[0.9rem] font-bold text-[#FFFDF7]/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Our Standards
              </a>
            </div>
          </div>

          {/* Right Hero Image (Masked) */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative z-10 hidden md:block">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="/hero image.jpg" 
                alt="Modern safe home environment" 
                className="w-full h-[500px] object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#171717]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Promo Banner */}
        <div className="bg-indigo-600 text-white px-4 py-6 text-center sm:px-6 lg:px-8 shadow-sm">
          <p className="text-sm sm:text-base font-medium">
             Don't miss out on this first order deal! Get 30% off with code:
            <span className="inline-block font-bold tracking-wider ml-2 bg-white text-indigo-600 px-2 py-0.5 rounded-md shadow-sm">
              WELCOME30
            </span>
          </p>
        </div>

      </header>


      {/* ─── SERVICES WITH IMAGES ──────────────────────────────────────────── */}
      <main id="services" className="max-w-7xl mx-auto px-6 py-32 bg-[#FFFDF7]">
        
        {/* Section header */}
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

        {/* Service grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICE_TIERS.map((tier, index) => (
            <div
              key={tier.id}
              className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-[0_24px_48px_-12px_rgba(22,101,52,0.15)] hover:-translate-y-1 hover:border-[#166534]/30 transition-all duration-300"
            >
              {/* Image Banner */}
              <div className="relative h-48 overflow-hidden">
                <div className={`absolute top-0 left-0 w-full h-1 z-10 ${index % 2 === 1 ? 'bg-[#4ADE80]' : 'bg-[#166534]'}`} />
                <img 
                  src={tier.image} 
                  alt={tier.name}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90" />
              </div>

              <div className="p-7 flex flex-col justify-between flex-1 relative -mt-12">
                {/* Card header */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[0.65rem] font-black font-mono tracking-widest text-[#166534] bg-white px-2 py-1 rounded shadow-sm border border-[#F0FDF4]">
                      TIER {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[0.6rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#F0FDF4] text-[#166534]">
                      {tier.target}
                    </span>
                  </div>

                  <h3 className="text-2xl font-bold tracking-tight text-[#171717] mb-3">
                    {tier.name}
                  </h3>
                  
                  {/* Features broken down for scannability */}
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

                {/* Price & booking */}
                <div className="mt-8 pt-6 border-t border-gray-100">
                  <div className="flex justify-between items-end mb-6">
                    <div className="flex flex-col">
                      <span className="text-[0.7rem] font-bold uppercase tracking-widest text-gray-400">
                        Starts At
                      </span>
                      <span className="text-[0.6rem] font-medium text-gray-400 mt-1">
                        Up to 1,500 sq ft
                      </span>
                    </div>
                    <div className="flex items-start">
                      <span className="text-sm font-bold text-[#166534] mt-1 mr-0.5">$</span>
                      <span className="text-4xl font-black tracking-tight text-[#171717] leading-none">
                        {tier.price}
                      </span>
                    </div>
                  </div>

                  {/* Next.js Link pushing to dedicated checkout route */}
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

      {/* ─── STANDARDS / WHY US ────────────────────────────────────────────── */}
      <section id="standards" className="relative py-32 overflow-hidden bg-[#171717]">
        
        {/* Background Image Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.08] mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop" 
            alt="Forest Texture" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#171717] via-transparent to-[#171717] z-0" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#4ADE80] mb-4">
              Enterprise-Grade Protocols
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#FFFDF7]">
              Why homeowners and managers switch to us
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-[1.05rem] leading-relaxed text-[#FFFDF7]/60">
              Digital diagnostic tracking, targeted eco-safe micro-encapsulations, and comprehensive perimeter mapping — instead of heavy chemicals in your common rooms. Every treatment is logged, auditable, and backed by a service guarantee.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-16 border-t border-white/10">
            {[
              {
                title: 'Zero Toxic Residue',
                body: 'Eco-safe micro-encapsulation formulas. Safe for children and indoor family pets.',
              },
              {
                title: 'Real-Time Audit Logs',
                body: 'Inspect every treatment report inside your dashboard portal — timestamped and verifiable.',
              },
              {
                title: '100% Service Guarantee',
                body: 'Free field re-treatment if pests return within the covered window. No questions asked.',
              },
            ].map((f) => (
              <div key={f.title} className="pl-6 border-l-2 border-[#166534] group">
                <h4 className="text-lg font-bold text-[#FFFDF7] mb-3 group-hover:text-[#4ADE80] transition-colors">
                  {f.title}
                </h4>
                <p className="text-[0.95rem] leading-relaxed text-[#FFFDF7]/50">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS CAROUSEL ──────────────────────────────────────────────── */}
      <section id="reviews" className="py-24 bg-[#FFFDF7] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#166534] mb-3">
            Client Feedback
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#171717]">
            Trusted by properties nationwide
          </h2>
        </div>

        {/* Marquee Container with pause-on-hover */}
        <div className="relative w-full flex overflow-x-hidden pause-marquee">
          
          {/* Edge Fade Masks to blend smoothly into the background */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#FFFDF7] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#FFFDF7] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Content - Duplicated for seamless infinite loop */}
          <div className="flex w-max animate-marquee space-x-6 px-3 py-4">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div 
                key={i} 
                className="w-[340px] md:w-[420px] bg-white rounded-2xl p-8 border border-gray-200 shadow-sm hover:shadow-[0_12px_30px_-8px_rgba(22,101,52,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col shrink-0"
              >
                {/* Gold Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg key={starIndex} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#F59E0B]">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-gray-500 text-[0.95rem] leading-relaxed mb-8 flex-grow">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#F0FDF4]"
                  />
                  <div>
                    <h4 className="text-[0.95rem] font-bold text-[#171717]">{review.name}</h4>
                    <p className="text-[0.8rem] font-medium text-[#166534]">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#171717] pt-10 pb-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[0.8rem] font-medium text-white/40">
            © {new Date().getFullYear()} NestGuard Environmental Services
          </span>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Contact' ? '/contact' : '#'}
                className="text-[0.8rem] font-medium text-white/40 hover:text-[#4ADE80] transition-colors"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
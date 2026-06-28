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
      text: "We switched our entire corporate campus to EcoGuard. The micro-encapsulation tech actually works without the toxic smell of traditional sprays."
    },
    {
      name: "Jessica L.",
      role: "Mother of 3",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=150&auto=format&fit=crop",
      text: "Finally, a pest control company that understands eco-safe treatments. My kids and dog are completely safe, and the ants are completely gone."
    }
  ]

  return (
    <div className="min-h-screen font-sans bg-[#F9F7F2] text-[#0F1F15] selection:bg-[#4A7C59] selection:text-white pb-0">
      
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
      <header className="relative bg-gradient-to-b from-[#0F1F15] via-[#132619] to-[#0F1F15] overflow-hidden border-b border-[#23402B]">
        
        {/* Ambient Mesh Glows */}
        <div className="absolute inset-0 pointer-events-none flex justify-center" aria-hidden>
          <div className="absolute top-0 right-10 w-[600px] h-[600px] bg-[#4A7C59]/10 rounded-full blur-[120px] mix-blend-screen" />
          <div className="absolute bottom-0 left-10 w-[600px] h-[600px] bg-[#C8A96E]/5 rounded-full blur-[100px] mix-blend-screen" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 py-20 lg:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-8">
          
          {/* Left Text Content */}
          <div className="flex-1 text-center lg:text-left z-10">
            <div className="inline-flex items-center gap-2 mb-6">
              <span className="block w-1.5 h-1.5 rounded-full bg-[#C8A96E] shadow-[0_0_8px_rgba(200,169,110,0.8)]" />
              <span className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#C8A96E]">
                Eco-Safe Environmental Management
              </span>
            </div>

            <h1 className="text-5xl lg:text-[72px] font-black leading-[1.05] tracking-tight text-[#F9F7F2] mb-6">
              Pest control that{' '}
              <em className="not-italic bg-gradient-to-r from-[#4A7C59] to-[#C8A96E] bg-clip-text text-transparent">
                books itself.
              </em>
            </h1>

            <p className="text-lg lg:text-xl leading-relaxed text-[#F9F7F2]/60 max-w-xl mx-auto lg:mx-0 mb-10">
              Premium residential and commercial treatment — flat rates, zero sales calls. Choose a plan, select a date, and secure your property in under a minute.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-[0.9rem] font-bold text-white bg-gradient-to-b from-[#4A7C59] to-[#3A6346] shadow-[0_4px_20px_rgba(74,124,89,0.3)] hover:shadow-[0_8px_30px_rgba(74,124,89,0.4)] hover:-translate-y-0.5 transition-all duration-300"
              >
                View Service Plans
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                  <path fillRule="evenodd" d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69L5.22 13.72a.75.75 0 0 0 0 1.06Z" clipRule="evenodd" />
                </svg>
              </a>
              <a
                href="#standards"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl text-[0.9rem] font-bold text-[#F9F7F2]/80 bg-white/5 border border-white/10 hover:bg-white/10 hover:text-white transition-all duration-300"
              >
                Our Standards
              </a>
            </div>
          </div>

          {/* Right Hero Image (Masked) */}
          <div className="flex-1 w-full max-w-2xl lg:max-w-none relative z-10 hidden md:block">
            <div className="relative rounded-[2rem] overflow-hidden border border-white/10 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] transform lg:-rotate-2 hover:rotate-0 transition-transform duration-700">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeefa?q=80&w=1973&auto=format&fit=crop" 
                alt="Modern safe home environment" 
                className="w-full h-[500px] object-cover opacity-90 hover:opacity-100 transition-opacity duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F1F15]/80 via-transparent to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </header>

      {/* ─── SERVICES WITH IMAGES ──────────────────────────────────────────── */}
      <main id="services" className="max-w-7xl mx-auto px-6 py-32 bg-[#F9F7F2]">
        
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#4A7C59] mb-3">
            Field Assessment Menu
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#0F1F15] mb-4">
            Choose your protection tier
          </h2>
          <p className="text-base text-[#6B7A6E] max-w-xl mx-auto">
            Flat transparent rates. Background-vetted, certified field operators. Safe for families, pets, and local ecosystems.
          </p>
        </div>

        {/* Service grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services && services.length > 0 ? (
            services.map((service, index) => (
              <div
                key={service.id}
                className="group flex flex-col justify-between bg-white rounded-2xl overflow-hidden border border-[#E8E4DC] shadow-[0_4px_16px_-4px_rgba(15,31,21,0.05)] hover:shadow-[0_24px_48px_-12px_rgba(74,124,89,0.15)] hover:-translate-y-1 hover:border-[#4A7C59]/30 transition-all duration-300"
              >
                {/* Image Banner */}
                <div className="relative h-48 overflow-hidden">
                  <div className={`absolute top-0 left-0 w-full h-1 z-10 ${index % 2 === 1 ? 'bg-[#C8A96E]' : 'bg-[#4A7C59]'}`} />
                  <img 
                    src={SERVICE_IMAGES[index % SERVICE_IMAGES.length]} 
                    alt={service.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent opacity-90" />
                </div>

                <div className="p-7 flex flex-col justify-between flex-1 relative -mt-12">
                  {/* Card header */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-[0.65rem] font-black font-mono tracking-widest text-[#4A7C59] bg-white px-2 py-1 rounded shadow-sm border border-[#EBF2ED]">
                        TIER {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="text-[0.65rem] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full bg-[#EBF2ED] text-[#4A7C59]">
                        Available
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold tracking-tight text-[#0F1F15] mb-3">
                      {service.name}
                    </h3>
                    <p className="text-[0.9rem] leading-relaxed text-[#6B7A6E] min-h-[3.5rem]">
                      {service.description || 'Comprehensive preventative barrier isolation and structural safety perimeter checking.'}
                    </p>
                  </div>

                  {/* Price & booking */}
                  <div className="mt-8 pt-6 border-t border-[#E8E4DC]">
                    <div className="flex justify-between items-end mb-6">
                      <span className="text-[0.7rem] font-bold uppercase tracking-widest text-[#6B7A6E]">
                        Flat Rate
                      </span>
                      <div className="flex items-start">
                        <span className="text-sm font-bold text-[#4A7C59] mt-1 mr-0.5">$</span>
                        <span className="text-4xl font-black tracking-tight text-[#0F1F15] leading-none">
                          {service.price}
                        </span>
                      </div>
                    </div>

                    {/* Order flow via native details */}
                    <details className="group/book relative">
                      <summary className="w-full py-3.5 rounded-xl font-bold text-[0.85rem] text-center cursor-pointer select-none flex justify-center items-center gap-2 bg-[#0F1F15] text-white hover:bg-[#4A7C59] transition-colors group-open/book:hidden">
                        Book This Plan
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4 opacity-60">
                          <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z" clipRule="evenodd" />
                        </svg>
                      </summary>

                      {/* Expanded booking form */}
                      <div className="rounded-xl p-5 mt-2 bg-[#EBF2ED]/50 border border-[#C4D9CA] shadow-inner animate-[slideDown_0.2s_ease-out]">
                        <div className="flex justify-between items-center mb-4">
                          <span className="text-[0.7rem] font-bold uppercase tracking-widest text-[#4A7C59]">
                            Schedule Appointment
                          </span>
                          {/* Cancel toggle (closing details) */}
                          <summary className="text-[0.7rem] font-bold uppercase tracking-widest text-[#6B7A6E] cursor-pointer hover:text-[#0F1F15] transition-colors">
                            Cancel
                          </summary>
                        </div>

                        {/* @ts-expect-error - Next.js handles server action forms natively */}
                        <form action={createOrder} className="space-y-4">
                          <input type="hidden" name="serviceId" value={service.id} />

                          <div>
                            <label className="block text-[0.7rem] font-bold uppercase tracking-widest text-[#0F1F15] mb-2">
                              Preferred Date
                            </label>
                            <input
                              type="date"
                              name="scheduledDate"
                              required
                              min={new Date().toISOString().split('T')[0]}
                              className="w-full px-4 py-3 text-[0.9rem] font-medium text-[#0F1F15] bg-white border border-[#C4D9CA] rounded-lg outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent transition-all cursor-pointer"
                              style={{ colorScheme: 'light' }}
                            />
                          </div>

                          <button
                            type="submit"
                            className="w-full py-3 rounded-lg font-bold text-[0.8rem] uppercase tracking-widest bg-gradient-to-b from-[#4A7C59] to-[#3A6346] text-white shadow-md hover:shadow-lg hover:-translate-y-px active:translate-y-0 transition-all"
                          >
                            Confirm & Book
                          </button>
                        </form>
                      </div>
                    </details>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-24 bg-[#EBF2ED]/50 border-2 border-dashed border-[#C4D9CA] rounded-3xl text-[#6B7A6E]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 mx-auto mb-4 opacity-50">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125m16.5 2.625c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
              </svg>
              <p className="text-[0.95rem] font-semibold">Loading service catalogue…</p>
            </div>
          )}
        </div>
      </main>

      {/* ─── STANDARDS / WHY US ────────────────────────────────────────────── */}
      <section id="standards" className="relative py-32 overflow-hidden bg-[#0F1F15]">
        
        {/* Background Image Texture */}
        <div className="absolute inset-0 z-0 opacity-[0.12] mix-blend-overlay">
          <img 
            src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop" 
            alt="Forest Texture" 
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-b from-[#0F1F15] via-transparent to-[#0F1F15] z-0" />

        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#C8A96E] mb-4">
              Enterprise-Grade Protocols
            </p>
            <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#F9F7F2]">
              Why homeowners and managers switch to us
            </h2>
            <p className="mt-6 max-w-2xl mx-auto text-[1.05rem] leading-relaxed text-[#F9F7F2]/60">
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
              <div key={f.title} className="pl-6 border-l-2 border-[#4A7C59] group">
                <h4 className="text-lg font-bold text-[#F9F7F2] mb-3 group-hover:text-[#4A7C59] transition-colors">
                  {f.title}
                </h4>
                <p className="text-[0.95rem] leading-relaxed text-[#F9F7F2]/50">
                  {f.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── REVIEWS CAROUSEL ──────────────────────────────────────────────── */}
      <section id="reviews" className="py-24 bg-[#F9F7F2] overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-6 mb-14 text-center">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#4A7C59] mb-3">
            Client Feedback
          </p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tight text-[#0F1F15]">
            Trusted by properties nationwide
          </h2>
        </div>

        {/* Marquee Container with pause-on-hover */}
        <div className="relative w-full flex overflow-x-hidden pause-marquee">
          
          {/* Edge Fade Masks to blend smoothly into the background */}
          <div className="absolute inset-y-0 left-0 w-16 md:w-48 bg-gradient-to-r from-[#F9F7F2] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 md:w-48 bg-gradient-to-l from-[#F9F7F2] to-transparent z-10 pointer-events-none" />

          {/* Scrolling Content - Duplicated for seamless infinite loop */}
          <div className="flex w-max animate-marquee space-x-6 px-3 py-4">
            {[...REVIEWS, ...REVIEWS].map((review, i) => (
              <div 
                key={i} 
                className="w-[340px] md:w-[420px] bg-white rounded-2xl p-8 border border-[#E8E4DC] shadow-[0_4px_16px_-4px_rgba(15,31,21,0.03)] hover:shadow-[0_12px_30px_-8px_rgba(74,124,89,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col shrink-0"
              >
                {/* Gold Stars */}
                <div className="flex gap-1 mb-5">
                  {[...Array(5)].map((_, starIndex) => (
                    <svg key={starIndex} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-[#C8A96E]">
                      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
                    </svg>
                  ))}
                </div>
                
                <p className="text-[#6B7A6E] text-[0.95rem] leading-relaxed mb-8 flex-grow">
                  "{review.text}"
                </p>

                <div className="flex items-center gap-4 mt-auto">
                  <img 
                    src={review.image} 
                    alt={review.name} 
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#EBF2ED]"
                  />
                  <div>
                    <h4 className="text-[0.95rem] font-bold text-[#0F1F15]">{review.name}</h4>
                    <p className="text-[0.8rem] font-medium text-[#4A7C59]">{review.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0F1F15] pt-10 pb-8 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[0.8rem] font-medium text-white/30">
            © {new Date().getFullYear()} EcoGuard Environmental Services
          </span>
          <div className="flex gap-8">
            {['Privacy Policy', 'Terms of Service', 'Contact'].map((item) => (
              <Link
                key={item}
                href={item === 'Contact' ? '/contact' : '#'}
                className="text-[0.8rem] font-medium text-white/40 hover:text-[#C8A96E] transition-colors"
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
import { createClient } from '@/utils/supabase/server'
import { createOrder } from '@/app/auth/actions'
import Navbar from '@/components/NavBar'
import Link from 'next/link'
import Hero from '@/components/landing/Hero'
import HowItWorks from '@/components/landing/HowItWorks'
import Quotation from '@/components/landing/Quotation'
import Services from '@/components/landing/Services'
import Reviews from '@/components/landing/Reviews'
import StandardsPage from '@/components/landing/StandardsPage'
import Footer from '@/components/landing/Footer'

import ReportIssueModal from '@/components/ReportIssueModal'

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

      <ReportIssueModal />
      {/* ─── PREMIUM SYMMETRICAL HERO ──────────────────────────────────────── */}
      <Hero />

      {/* ─── How it Works Section ──────────────────────────────────────── */}
      <HowItWorks />

      {/* ─── Quotation Section ──────────────────────────────────────── */}
      <Quotation />

      {/* ─── SERVICES WITH IMAGES ──────────────────────────────────────────── */}
      <Services />

      {/* ─── STANDARDS / WHY US ────────────────────────────────────────────── */}
      <StandardsPage />

      {/* ─── REVIEWS CAROUSEL ──────────────────────────────────────────────── */}
      <Reviews />

      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <Footer />
    </div>
  )
}
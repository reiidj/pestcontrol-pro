import Link from 'next/link'
import { ShieldCheck, Database, Lock } from 'lucide-react'

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F2] font-sans text-[#0F1F15] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B7A6E] hover:text-[#4A7C59] transition-colors mb-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Back to Home
        </Link>

        {/* Portfolio Disclaimer Banner */}
        <div className="mb-12 p-6 bg-[#EBF2ED] border border-[#C4D9CA] rounded-2xl flex gap-4 items-start">
          <ShieldCheck className="w-6 h-6 text-[#4A7C59] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-bold text-[#1B4332] uppercase tracking-widest mb-1">Portfolio Project Disclaimer</h2>
            <p className="text-sm font-medium text-[#4A7C59] leading-relaxed">
              This application is a software engineering showcase demonstrating full-stack development, relational database design, and secure authentication. It is not a real commercial entity.
            </p>
          </div>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Privacy Policy</h1>
          <p className="text-[#6B7A6E] font-medium">Last updated: August 2026</p>
        </header>

        <article className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Information Collection</h2>
            <p className="text-sm font-medium text-[#6B7A6E] leading-relaxed">
              When you create an account to test this application, we collect the email address and mock service details you provide. Because this is a portfolio project, we strongly advise using a testing email and avoiding the use of real passwords that you utilize on actual commercial websites.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">2. Enterprise-Grade Security Architecture</h2>
            <p className="text-sm font-medium text-[#6B7A6E] leading-relaxed mb-6">
              Although this is a demonstration environment, your data is handled with the utmost security using industry-standard backend architecture:
            </p>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 border border-[#E8E4DC] bg-white rounded-xl">
                <Lock className="w-5 h-5 text-[#4A7C59] mb-3" />
                <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Encrypted Auth</h3>
                <p className="text-xs text-[#6B7A6E] font-medium">Passwords are never stored in plain text. Authentication is securely managed via Supabase using heavily salted cryptographic hashing.</p>
              </div>
              <div className="p-5 border border-[#E8E4DC] bg-white rounded-xl">
                <Database className="w-5 h-5 text-[#4A7C59] mb-3" />
                <h3 className="text-xs font-bold uppercase tracking-widest mb-2">Row-Level Security</h3>
                <p className="text-xs text-[#6B7A6E] font-medium">PostgreSQL Row-Level Security (RLS) policies strictly isolate data. Users can only query and modify their own specific records.</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Data Usage & Deletion</h2>
            <p className="text-sm font-medium text-[#6B7A6E] leading-relaxed">
              Your data will never be sold, shared, or used for marketing purposes. It exists solely to demonstrate the CRUD (Create, Read, Update, Delete) capabilities of this web application. The database administrator reserves the right to wipe the test database periodically to maintain a clean portfolio environment.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
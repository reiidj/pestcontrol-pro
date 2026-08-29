import Link from 'next/link'
import { AlertCircle } from 'lucide-react'

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#F9F7F2] font-sans text-[#0F1F15] py-16 px-6">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#6B7A6E] hover:text-[#4A7C59] transition-colors mb-12">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4"><path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" /></svg>
          Back to Home
        </Link>

        <div className="mb-12 p-6 bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl flex gap-4 items-start">
          <AlertCircle className="w-6 h-6 text-[#D97706] shrink-0 mt-0.5" />
          <div>
            <h2 className="text-sm font-bold text-[#92400E] uppercase tracking-widest mb-1">Non-Commercial Entity</h2>
            <p className="text-sm font-medium text-[#D97706] leading-relaxed">
              By interacting with this site, you acknowledge that no actual services will be rendered and no real technicians will be dispatched.
            </p>
          </div>
        </div>

        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Terms of Service</h1>
          <p className="text-[#6B7A6E] font-medium">Last updated: August 2026</p>
        </header>

        <article className="prose prose-slate max-w-none space-y-8">
          <section>
            <h2 className="text-xl font-bold mb-3">1. Nature of Service</h2>
            <p className="text-sm font-medium text-[#6B7A6E] leading-relaxed">
              NestGuard Environmental Services (also referenced as PestControl Pro) is a fictional entity created as a technical demonstration. Any packages, pricing, or bookings made through this platform are simulations designed to showcase backend logic, API engineering, and frontend UI design.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">2. User Accounts</h2>
            <p className="text-sm font-medium text-[#6B7A6E] leading-relaxed">
              You are welcome to create an account to test the administrative and customer-facing features of this application. However, you agree not to submit abusive, offensive, or malicious data into the forms. We reserve the right to terminate any test accounts or clear the database without prior notice.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">3. Liability</h2>
            <p className="text-sm font-medium text-[#6B7A6E] leading-relaxed">
              The developer of this application assumes no liability for any actions taken on this site. While the system utilizes modern security protocols (Next.js server actions, Supabase Auth, PostgreSQL constraints), it is provided "as is" for demonstration purposes.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold mb-3">4. Intellectual Property</h2>
            <p className="text-sm font-medium text-[#6B7A6E] leading-relaxed">
              The underlying code, architecture, and UI/UX design are part of a software engineering portfolio. Visitors, including recruiters and hiring managers, are encouraged to inspect the source code to evaluate the technical implementation of the application.
            </p>
          </section>
        </article>
      </div>
    </div>
  )
}
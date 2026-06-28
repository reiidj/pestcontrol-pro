import Navbar from '@/components/NavBar'
import Link from 'next/link'

export default function ContactPage() {
  return (
    <div className="min-h-screen font-sans bg-[#F9F7F2] text-[#0F1F15] selection:bg-[#4A7C59] selection:text-white flex flex-col">
      
      {/* ─── NAVBAR ────────────────────────────────────────────────────────── */}
      <Navbar />

      {/* ─── HEADER ────────────────────────────────────────────────────────── */}
      <header className="relative bg-[#0F1F15] pt-20 pb-32 overflow-hidden border-b border-[#23402B]">
        {/* Ambient Mesh Glow */}
        <div className="absolute inset-0 pointer-events-none flex justify-center" aria-hidden>
          <div className="absolute top-0 w-[800px] h-[500px] bg-[#4A7C59]/15 rounded-full blur-[120px] mix-blend-screen" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#C8A96E] mb-4">
            Client Support
          </p>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#F9F7F2] mb-6">
            Get in touch with our team
          </h1>
          <p className="text-lg text-[#F9F7F2]/60 max-w-2xl mx-auto leading-relaxed">
            Whether you need a custom commercial quote, have questions about our eco-safe formulas, or need immediate assistance, our certified specialists are here to help.
          </p>
        </div>
      </header>

      {/* ─── MAIN CONTENT ──────────────────────────────────────────────────── */}
      <main className="flex-grow relative z-20 -mt-16 max-w-7xl mx-auto px-6 w-full pb-24">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          
          {/* Left Column: Contact Info Cards */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Phone Card */}
            <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC] shadow-[0_8px_30px_-12px_rgba(15,31,21,0.08)] group hover:border-[#4A7C59]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EBF2ED] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#4A7C59]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-2.893-1.438-5.196-3.74-6.636-6.636l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#6B7A6E] mb-2">Call Us</h3>
              <p className="text-2xl font-black text-[#0F1F15] tracking-tight">1-800-ECO-GUARD</p>
              <p className="text-[0.85rem] font-medium text-[#6B7A6E] mt-2">Mon-Fri from 8am to 6pm</p>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-2xl p-8 border border-[#E8E4DC] shadow-[0_8px_30px_-12px_rgba(15,31,21,0.08)] group hover:border-[#4A7C59]/30 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#EBF2ED] flex items-center justify-center mb-6 group-hover:scale-105 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-[#4A7C59]">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-[#6B7A6E] mb-2">Email Us</h3>
              <p className="text-xl font-bold text-[#0F1F15] tracking-tight">support@ecoguard.com</p>
              <p className="text-[0.85rem] font-medium text-[#6B7A6E] mt-2">We typically reply within 2 hours</p>
            </div>

          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-3xl p-8 md:p-12 border border-[#E8E4DC] shadow-[0_20px_60px_-16px_rgba(15,31,21,0.1)]">
              <h2 className="text-2xl font-black text-[#0F1F15] mb-8 tracking-tight">Send a message</h2>
              
              {/* Note: Update the action attribute once we build the backend handler */}
              <form className="space-y-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-[0.75rem] font-bold uppercase tracking-widest text-[#6B7A6E] mb-2">
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      required
                      className="w-full px-4 py-3.5 text-[0.95rem] text-[#0F1F15] bg-[#F9F8F6] border border-[#E8E4DC] rounded-xl outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent transition-all placeholder:text-[#6B7A6E]/50"
                      placeholder="Jane"
                    />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="block text-[0.75rem] font-bold uppercase tracking-widest text-[#6B7A6E] mb-2">
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      required
                      className="w-full px-4 py-3.5 text-[0.95rem] text-[#0F1F15] bg-[#F9F8F6] border border-[#E8E4DC] rounded-xl outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent transition-all placeholder:text-[#6B7A6E]/50"
                      placeholder="Doe"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-[0.75rem] font-bold uppercase tracking-widest text-[#6B7A6E] mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3.5 text-[0.95rem] text-[#0F1F15] bg-[#F9F8F6] border border-[#E8E4DC] rounded-xl outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent transition-all placeholder:text-[#6B7A6E]/50"
                    placeholder="jane@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-[0.75rem] font-bold uppercase tracking-widest text-[#6B7A6E] mb-2">
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3.5 text-[0.95rem] font-medium text-[#0F1F15] bg-[#F9F8F6] border border-[#E8E4DC] rounded-xl outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent transition-all appearance-none cursor-pointer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke-width='1.5' stroke='%236B7A6E'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' d='M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9' /%3E%3C/svg%3E")`,
                      backgroundRepeat: 'no-repeat',
                      backgroundPosition: 'right 1rem center',
                      backgroundSize: '1.25rem'
                    }}
                  >
                    <option value="general">General Inquiry</option>
                    <option value="commercial">Commercial Services Quote</option>
                    <option value="billing">Billing & Support</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-[0.75rem] font-bold uppercase tracking-widest text-[#6B7A6E] mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3.5 text-[0.95rem] text-[#0F1F15] bg-[#F9F8F6] border border-[#E8E4DC] rounded-xl outline-none focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent transition-all placeholder:text-[#6B7A6E]/50 resize-y"
                    placeholder="How can we help you today?"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-xl font-bold text-[0.9rem] uppercase tracking-widest bg-gradient-to-b from-[#4A7C59] to-[#3A6346] text-white shadow-[0_4px_14px_rgba(74,124,89,0.25)] hover:shadow-[0_6px_20px_rgba(74,124,89,0.35)] hover:-translate-y-0.5 transition-all active:translate-y-0"
                >
                  Send Message
                </button>
              </form>

            </div>
          </div>
        </div>
      </main>
      
      {/* ─── FOOTER ────────────────────────────────────────────────────────── */}
      <footer className="bg-[#0F1F15] pt-10 pb-8 px-6 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <span className="text-[0.8rem] font-medium text-white/30">
            © {new Date().getFullYear()} EcoGuard Environmental Services
          </span>
          <div className="flex gap-8">
            <Link href="/" className="text-[0.8rem] font-medium text-white/40 hover:text-[#C8A96E] transition-colors">Home</Link>
            <Link href="#" className="text-[0.8rem] font-medium text-white/40 hover:text-[#C8A96E] transition-colors">Privacy Policy</Link>
            <Link href="#" className="text-[0.8rem] font-medium text-white/40 hover:text-[#C8A96E] transition-colors">Terms of Service</Link>
          </div>
        </div>
      </footer>
    </div>
  )
}
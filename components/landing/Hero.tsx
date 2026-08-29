export default function Hero() {
  return (
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
      <div className="bg-[#001A3E] text-white px-4 py-4 sm:py-5 text-center sm:px-6 lg:px-8 shadow-md border-b-4 border-[#94C969]">
        <p className="text-sm sm:text-base font-medium flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
          <span>Don't miss out on this first order deal! Get 30% off with code:</span>
          <span className="inline-block font-black tracking-widest bg-[#94C969] text-[#001A3E] px-3 py-1 rounded-md shadow-sm">
            WELCOME30
          </span>
        </p>
      </div>
    </header>
  )
}
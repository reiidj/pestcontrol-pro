export default function Hero() {
  return (
    <header className="relative overflow-hidden bg-[#171717] text-[#F9F7F2]">
      {/* Main Hero */}
      <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          
          {/* Left Content */}
          <div className="relative z-10 max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-7 flex items-center gap-3">
              <span className="h-px w-10 bg-[#4ADE80]" />

              <span className="text-xs font-black uppercase tracking-[0.2em] text-[#4ADE80]">
                Professional Pest Protection
              </span>
            </div>

            {/* Heading */}
            <h1 className="mb-7 text-5xl font-black leading-[0.95] tracking-[-0.04em] text-[#F9F7F2] sm:text-6xl lg:text-[76px]">
              Pest control
              <span className="block text-[#4ADE80]">
                that books itself.
              </span>
            </h1>

            {/* Description */}
            <p className="mb-9 max-w-xl text-base leading-7 text-[#F9F7F2]/65 sm:text-lg">
              Premium residential and commercial treatment with flat rates,
              straightforward service, and no sales calls. Choose a plan,
              select a date, and protect your property in under a minute.
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <a
                href="#services"
                className="inline-flex items-center justify-center gap-3 border-2 border-[#4ADE80] bg-[#4ADE80] px-7 py-4 text-sm font-black uppercase tracking-wide text-[#171717] transition-colors duration-200 hover:border-[#F9F7F2] hover:bg-[#F9F7F2]"
              >
                View Service Plans

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5v5.69L5.22 13.72a.75.75 0 0 0 0 1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>

              <a
                href="#standards"
                className="group inline-flex items-center gap-2 border-b-2 border-[#3A6346] pb-1 text-sm font-bold uppercase tracking-wide text-[#F9F7F2] transition-colors duration-200 hover:border-[#4ADE80]"
              >
                Our Standards

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.844-3.844a.75.75 0 1 1 1.06-1.06l5.125 5.125a.75.75 0 0 1 0 1.06l-5.125 5.125a.75.75 0 0 1-1.06-1.06l3.844-3.844H3.75A.75.75 0 0 1 3 10Z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>

            {/* Trust Detail */}
            <div className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-[#F9F7F2]/10 pt-6">
              <div>
                <p className="text-lg font-black text-[#F9F7F2]">
                  01
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#F9F7F2]/45">
                  Choose a plan
                </p>
              </div>

              <div className="hidden h-8 w-px bg-[#F9F7F2]/10 sm:block" />

              <div>
                <p className="text-lg font-black text-[#F9F7F2]">
                  02
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#F9F7F2]/45">
                  Pick a date
                </p>
              </div>

              <div className="hidden h-8 w-px bg-[#F9F7F2]/10 sm:block" />

              <div>
                <p className="text-lg font-black text-[#F9F7F2]">
                  03
                </p>
                <p className="mt-1 text-[11px] font-bold uppercase tracking-[0.15em] text-[#F9F7F2]/45">
                  Stay protected
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            {/* Green framing block */}
            <div className="absolute -right-3 -top-3 h-full w-full border-2 border-[#3A6346] sm:-right-5 sm:-top-5" />

            {/* Image */}
            <div className="relative overflow-hidden bg-[#3A6346]">
              <img
                src="/Worker Spraying.png"
                alt="Professional pest control technician treating the exterior of a residential property"
                className="h-[420px] w-full object-cover sm:h-[520px] lg:h-[600px]"
              />

              {/* Solid image label */}
              <div className="absolute bottom-0 left-0 max-w-xs bg-[#171717] px-6 py-5">
                <div className="mb-2 flex items-center gap-2">
                  <span className="h-2 w-2 bg-[#4ADE80]" />

                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#4ADE80]">
                    Property Protection
                  </span>
                </div>

                <p className="text-sm font-bold leading-5 text-[#F9F7F2]">
                  Targeted treatment around the places pests enter,
                  hide, and multiply.
                </p>
              </div>
            </div>

            {/* Vertical accent */}
            <div className="absolute -bottom-4 -left-4 hidden h-24 w-24 border-b-4 border-l-4 border-[#4ADE80] sm:block" />
          </div>
        </div>
      </div>

      {/* Promotional Banner */}
      <div className="border-t border-[#171717] bg-[#4ADE80] px-6 py-4 text-[#171717] sm:py-5">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 sm:flex-row">
          <p className="text-center text-sm font-bold sm:text-left sm:text-base">
            First time with NestGuard? Save 30% on your first treatment.
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs font-black uppercase tracking-[0.15em]">
              Code
            </span>

            <span className="border-2 border-[#171717] px-3 py-1 text-sm font-black tracking-[0.2em]">
              WELCOME30
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
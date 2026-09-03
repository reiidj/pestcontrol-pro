export default function StandardsPage() {
  const standards = [
    {
      number: '01',
      title: 'Zero Toxic Residue',
      body: 'Eco-safe micro-encapsulation formulas designed for effective treatment while keeping your home comfortable for children and indoor pets.',
    },
    {
      number: '02',
      title: 'Real-Time Audit Logs',
      body: 'Every treatment is documented in your dashboard with timestamps and service details, giving you a clear record of your property’s protection.',
    },
    {
      number: '03',
      title: '100% Service Guarantee',
      body: 'If pests return within your covered service window, we return for a free re-treatment. No complicated claims or extra charges.',
    },
  ]

  return (
    <section
      id="standards"
      className="bg-[#171717] px-6 py-24 text-[#F9F7F2] sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="max-w-4xl">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#4ADE80]" />

            <p className="text-[0.7rem] font-black uppercase tracking-[0.2em] text-[#4ADE80]">
              Our Standards
            </p>
          </div>

          <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-[-0.035em] sm:text-5xl lg:text-6xl">
            Protection built around
            <span className="block text-[#4ADE80]">
              better standards.
            </span>
          </h2>

          <p className="mt-7 max-w-2xl text-base leading-7 text-[#F9F7F2]/55 sm:text-lg">
            Effective pest control should not mean unnecessary chemicals,
            unclear service records, or complicated guarantees. NestGuard
            combines targeted treatment with transparent service.
          </p>
        </div>

        {/* Standards */}
        <div className="mt-20 grid border-t border-[#F9F7F2]/10 md:grid-cols-3">
          {standards.map((standard, index) => (
            <div
              key={standard.title}
              className={`group py-8 md:py-10 ${
                index !== 0
                  ? 'border-t border-[#F9F7F2]/10 md:border-l md:border-t-0'
                  : ''
              }`}
            >
              <div className="px-0 md:px-8 lg:px-10">
                {/* Number */}
                <div className="mb-8 flex items-center justify-between">
                  <span className="text-xs font-black tracking-[0.15em] text-[#4ADE80]">
                    {standard.number}
                  </span>

                  <span className="h-2 w-2 bg-[#3A6346] transition-colors duration-200 group-hover:bg-[#4ADE80]" />
                </div>

                {/* Title */}
                <h3 className="mb-4 text-xl font-black tracking-[-0.02em] text-[#F9F7F2] transition-colors duration-200 group-hover:text-[#4ADE80]">
                  {standard.title}
                </h3>

                {/* Description */}
                <p className="max-w-sm text-sm leading-6 text-[#F9F7F2]/45">
                  {standard.body}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Statement */}
        <div className="mt-8 flex flex-col gap-4 border-t border-[#F9F7F2]/10 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-xl text-xs leading-5 text-[#F9F7F2]/35">
            Every service is documented, every treatment is targeted, and
            every plan is backed by a clear service commitment.
          </p>

          <div className="flex items-center gap-3 text-xs font-black uppercase tracking-[0.15em] text-[#F9F7F2]/50">
            <span className="h-2 w-2 bg-[#4ADE80]" />
            NestGuard Standard
          </div>
        </div>
      </div>
    </section>
  )
}
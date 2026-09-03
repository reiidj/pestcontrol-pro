import Link from 'next/link'

const SERVICE_TIERS = [
  {
    id: '11111111-1111-4111-8111-111111111111',
    name: 'Exterior Perimeter Shield',
    target: 'Preventative / Budget',
    description:
      'Exterior foundation barrier, wasp nest removal, basic yard perimeter.',
    price: 89,
    image:
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '22222222-2222-4222-8222-222222222222',
    name: 'Complete Home Protection',
    target: 'Standard Residential',
    description:
      'Tier 1 + Interior treatment, rodent monitoring stations, roach/ant control.',
    price: 129,
    image:
      'https://images.unsplash.com/photo-1558227691-41ea78d1f631?q=80&w=1000&auto=format&fit=crop',
  },
  {
    id: '33333333-3333-4333-8333-333333333333',
    name: 'Premium Eco-Guard',
    target: 'Premium / Families',
    description:
      'Tier 2 + Mosquito/Tick yard fogging, eco-botanical indoor treatments.',
    price: 189,
    image:
      'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=1000&auto=format&fit=crop',
  },
]

export default function Services() {
  return (
    <section
      id="services"
      className="bg-[#F9F7F2] px-6 py-24 sm:py-28 lg:py-32"
    >
      <div className="mx-auto max-w-7xl">

        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div className="shrink-0">
            <h2 className="text-4xl font-black leading-[0.95] tracking-[-0.035em] text-[#171717] sm:text-5xl lg:text-6xl">
              <span className="block whitespace-nowrap">Choose your</span>
              <span className="block whitespace-nowrap text-[#3A6346]">
                Protection tier.
              </span>
            </h2>
          </div>

          <div>
            <p className="max-w-md text-sm leading-6 text-[#171717]/55 sm:text-base">
              Straightforward pricing. Professional treatment. No sales calls
              or complicated contracts.
            </p>
          </div>
        </div>
        <br />
        
        {/* Service Cards */}
        <div className="grid gap-6 lg:grid-cols-3">
          {SERVICE_TIERS.map((tier, index) => (
            <article
              key={tier.id}
              className="group flex flex-col overflow-hidden border border-[#171717]/10 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-[#3A6346]/40 hover:shadow-[0_20px_40px_-20px_rgba(23,23,23,0.3)]"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden bg-[#3A6346]">
                <img
                  src={tier.image}
                  alt={tier.name}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Solid image label */}
                <div className="absolute left-0 top-0 bg-[#171717] px-4 py-3">
                  <span className="text-[0.65rem] font-black tracking-[0.18em] text-[#4ADE80]">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Target */}
                <div className="absolute bottom-0 right-0 bg-[#F9F7F2] px-4 py-3">
                  <span className="text-[0.6rem] font-black uppercase tracking-[0.15em] text-[#3A6346]">
                    {tier.target}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-1 flex-col p-7 sm:p-8">

                {/* Title */}
                <div>
                  <h3 className="mb-4 text-2xl font-black leading-tight tracking-[-0.025em] text-[#171717]">
                    {tier.name}
                  </h3>

                  <div className="space-y-2.5">
                    {tier.description.split(', ').map((feature, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-3 text-sm leading-5 text-[#171717]/60"
                      >
                        <span className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-[#4ADE80]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Bottom */}
                <div className="mt-auto pt-8">

                  {/* Divider */}
                  <div className="mb-6 h-px bg-[#171717]/10" />

                  {/* Price */}
                  <div className="mb-6 flex items-end justify-between">
                    <div>
                      <p className="mb-1 text-[0.6rem] font-black uppercase tracking-[0.18em] text-[#171717]/40">
                        Starting at
                      </p>

                      <p className="text-xs text-[#171717]/40">
                        Up to 1,500 sq ft
                      </p>
                    </div>

                    <div className="flex items-start text-[#171717]">
                      <span className="mt-1 mr-0.5 text-sm font-black text-[#3A6346]">
                        $
                      </span>

                      <span className="text-4xl font-black leading-none tracking-[-0.04em]">
                        {tier.price}
                      </span>
                    </div>
                  </div>

                  {/* CTA */}
                  <Link
                    href={`/checkout?serviceId=${tier.id}`}
                    className="group/button flex w-full items-center justify-between border-2 border-[#171717] bg-[#171717] px-5 py-4 text-sm font-black uppercase tracking-wide text-[#F9F7F2] transition-colors duration-200 hover:border-[#3A6346] hover:bg-[#3A6346]"
                  >
                    <span>Configure & Book</span>

                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="h-4 w-4 transition-transform duration-200 group-hover/button:translate-x-1"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 10a.75.75 0 0 1 .75-.75h10.638l-3.844-3.844a.75.75 0 1 1 1.06-1.06l5.125 5.125a.75.75 0 0 1 0 1.06l-5.125 5.125a.75.75 0 0 1-1.06-1.06l3.844-3.844H3.75A.75.75 0 0 1 3 10Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="mt-10 flex flex-col gap-4 border-t border-[#171717]/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-5 text-[#171717]/45">
            All plans include professional assessment and treatment
            documentation.
          </p>

          <a
            href="#standards"
            className="text-xs font-black uppercase tracking-[0.12em] text-[#3A6346] underline decoration-[#4ADE80] underline-offset-4 transition-colors hover:text-[#171717]"
          >
            View our standards
          </a>
        </div>
      </div>
    </section>
  )
}
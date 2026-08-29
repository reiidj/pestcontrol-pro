import { MessageSquare, Calculator, CalendarCheck, ShieldCheck } from 'lucide-react'

export default function HowItWorks() {
  const steps = [
    {
      title: "Contact Us",
      description: "Get in touch with our friendly team to discuss your pest concerns. We’re here to answer your questions and guide you through the process.",
      icon: MessageSquare
    },
    {
      title: "Free Estimate",
      description: "We will provide a no-obligation, free estimate based on your specific needs. Transparent pricing with no hidden fees—just honest service.",
      icon: Calculator
    },
    {
      title: "Book a Date",
      description: "Choose a date and time that works best for you. We offer flexible scheduling to minimize disruption to your home or business.",
      icon: CalendarCheck
    },
    {
      title: "Pest Service",
      description: "Our experienced technicians carry out effective solutions using safe methods. We don’t just treat the problem—we ensure long-lasting results.",
      icon: ShieldCheck
    }
  ]

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#4A7C59]">
            Our Process
          </p>
          <h2 className="text-3xl md:text-5xl font-black text-[#0F1F15] tracking-tight">
            How It Works
          </h2>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative p-6 rounded-3xl bg-[#F9F7F2] border border-[#E8E4DC] hover:shadow-lg transition-shadow">
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-10 h-10 bg-[#0F1F15] text-white rounded-full flex items-center justify-center text-sm font-black shadow-md">
                {index + 1}
              </div>
              
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-[#E8E4DC] mb-6 text-[#4A7C59]">
                <step.icon className="w-6 h-6" />
              </div>
              
              <h3 className="text-lg font-black text-[#0F1F15] mb-3">{step.title}</h3>
              <p className="text-sm font-medium text-[#6B7A6E] leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        
      </div>
    </section>
  )
}
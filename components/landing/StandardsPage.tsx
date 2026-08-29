export default function StandardsPage() {
  return (
    <section id="standards" className="relative py-32 overflow-hidden bg-[#171717]">
      <div className="absolute inset-0 z-0 opacity-[0.08] mix-blend-overlay">
        <img 
          src="https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=2000&auto=format&fit=crop" 
          alt="Forest Texture" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="absolute inset-0 bg-gradient-to-b from-[#171717] via-transparent to-[#171717] z-0" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="text-[0.75rem] font-bold uppercase tracking-[0.2em] text-[#4ADE80] mb-4">
            Enterprise-Grade Protocols
          </p>
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-[#FFFDF7]">
            Why homeowners and managers switch to us
          </h2>
          <p className="mt-6 max-w-2xl mx-auto text-[1.05rem] leading-relaxed text-[#FFFDF7]/60">
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
            <div key={f.title} className="pl-6 border-l-2 border-[#166534] group">
              <h4 className="text-lg font-bold text-[#FFFDF7] mb-3 group-hover:text-[#4ADE80] transition-colors">
                {f.title}
              </h4>
              <p className="text-[0.95rem] leading-relaxed text-[#FFFDF7]/50">
                {f.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
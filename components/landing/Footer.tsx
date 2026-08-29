import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-[#171717] pt-24 pb-10 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-20 mb-20">
          <div className="md:col-span-2 space-y-4">
            <h3 className="text-2xl font-black text-white tracking-tight">
              NestGuard<span className="text-[#4ADE80]">.</span>
            </h3>
            <p className="text-sm font-medium text-white/40 max-w-sm leading-relaxed">
              Professional environmental services and pest control protecting your home, family, and peace of mind with eco-friendly, sustainable solutions.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/70">Company</h4>
            <div className="flex flex-col gap-4">
              {[
                { label: 'Privacy Policy', href: '/privacy' },
                { label: 'Terms of Service', href: '/terms' },
                { label: 'Contact', href: '/contact' },
              ].map((item) => (
                <Link key={item.label} href={item.href} className="text-sm font-medium text-white/40 hover:text-[#4ADE80] transition-colors w-fit">
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white/70">Get in Touch</h4>
            <div className="flex flex-col gap-4 text-sm font-medium text-white/40">
              <a href="mailto:support@nestguard.com" className="hover:text-[#4ADE80] transition-colors w-fit">support@nestguard.com</a>
              <p>1-800-NEST-GRD</p>
              <p className="pt-2 text-white/30 text-xs">Available 24/7 for emergency pest removal.</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-white/10">
          <span className="text-xs font-medium text-white/30 text-center md:text-left">
            © {new Date().getFullYear()} NestGuard Environmental Services. All rights reserved. <br className="md:hidden" />
            Fictional entity for demonstration purposes.
          </span>
          
          <div className="flex items-center gap-4 text-xs font-medium text-white/30">
            <span>Engineered by <a href="https://djemf.vercel.app" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-[#4ADE80] transition-colors font-bold">Rei Djemf Rivera</a></span>
            <div className="w-1 h-1 rounded-full bg-white/20"></div>
            <a href="https://github.com/reiidj/pestcontrol-pro" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Source Code
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
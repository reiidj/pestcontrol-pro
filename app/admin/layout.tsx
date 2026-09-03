'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import SignOutButton from '@/components/SignOutButton'
import { ShoppingCart, Ticket, BarChart3, Bug } from 'lucide-react'

// Define your navigation links in a clean array
const NAV_LINKS = [
  { name: 'Order Queue', href: '/admin', icon: ShoppingCart },
  { name: 'Promo Codes', href: '/admin/promos', icon: Ticket },
  { name: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
  { name: 'Reports', href: '/admin/issues', icon: Bug },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex h-screen w-full font-sans overflow-hidden bg-[#F9F7F2] text-[#0F1F15]">
      {/* ─── GLOBAL ADMIN STYLES ─── */}
      <style>{`
        :root {
          --forest:   #0F1F15;
          --ivory:    #F9F7F2;
          --sage:     #4A7C59;
          --sage-lt:  #EBF2ED;
          --sage-mid: #C4D9CA;
          --gold:     #C8A96E;
          --fog:      #E8E4DC;
          --muted:    #6B7A6E;
        }
        body { margin: 0; padding: 0; }
      `}</style>

      {/* ─── LEFT SIDEBAR (Desktop) ─── */}
      <aside className="hidden md:flex flex-col w-64 bg-[#0F1F15] text-white shrink-0 border-r border-[#0F1F15]">
        <div className="p-6 pb-2">
          <div className="text-xl font-black tracking-tight mb-8">
            EcoGuard<span className="text-[#4A7C59]">Admin</span>
          </div>
          <div className="text-xs font-bold uppercase tracking-widest text-white/40 mb-4">Dashboard</div>
          
          <nav className="space-y-1.5">
            {NAV_LINKS.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href

              return (
                <Link 
                  key={link.name}
                  href={link.href} 
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition-colors ${
                    isActive 
                      ? 'bg-[#4A7C59] text-white shadow-sm' 
                      : 'text-white/50 hover:bg-white/5 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4" /> {link.name}
                </Link>
              )
            })}
          </nav>
        </div>

        <div className="mt-auto p-6 border-t border-white/10 space-y-4">
          <Link href="/" className="block text-sm font-medium text-white/50 hover:text-white transition-colors">
            View Live Site
          </Link>
          <SignOutButton />
        </div>
      </aside>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        
        {/* Mobile Top Nav */}
        <nav className="md:hidden sticky top-0 z-30 bg-[#0F1F15] px-6 py-4 flex items-center justify-between shadow-md shrink-0">
          <div className="text-sm font-bold text-white">EcoGuard<span className="text-[#4A7C59]">Admin</span></div>
          <SignOutButton />
        </nav>

        {/* Dynamic Page Content Injector */}
        <main className="flex-1 overflow-y-auto px-6 md:px-10 py-10">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </main>

      </div>
    </div>
  )
}
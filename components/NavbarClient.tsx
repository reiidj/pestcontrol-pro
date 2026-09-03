'use client'

import { useState } from 'react'
import Link from 'next/link'

export function NavbarClient({
  user,
  isAdmin,
  signOutButton,
}: {
  user: { email?: string } | null
  isAdmin: boolean
  signOutButton: React.ReactNode
}) {
  const [open, setOpen] = useState(false)

  const navLinks = [
    { href: '/#services', label: 'Services' },
    { href: '/#standards', label: 'Standards' },
    { href: '/#reviews', label: 'Reviews' },
    { href: '/contact', label: 'Contact' },
  ]

  return (
    <>
      <style>{`
        .nav-link { transition: color 0.15s; }
        .nav-link:hover { color: #3A6346; }
        .mobile-row { transition: background 0.12s; }
        .mobile-row:hover { background: #F4F2EE; }
      `}</style>

      {/* ── Navbar shell ─────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-50 w-full"
        style={{
          background: 'rgba(255,255,255,0.97)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderBottom: '1px solid #E8E4DC',
          boxShadow: '0 1px 8px -2px rgba(15,31,21,0.07)',
        }}
      >
        {/* ── Main row ─────────────────────────────────────────────────── */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">

          {/* Brand */}
          <Link
            href="/"
            className="text-xl font-black tracking-tight shrink-0"
            style={{ color: '#3A6346' }}
            onClick={() => setOpen(false)}
          >
            NestGuard
          </Link>

          {/* Desktop center links */}
          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link text-sm font-semibold"
                style={{ color: '#374151' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop right actions */}
          <div className="hidden md:flex items-center gap-5">
            {user ? (
              <>
                {isAdmin && (
                  <Link href="/admin" className="nav-link text-sm font-bold" style={{ color: '#0F1F15' }}>
                    Admin
                  </Link>
                )}
                <Link href="/dashboard" className="nav-link text-sm font-bold" style={{ color: '#0F1F15' }}>
                  My Bookings
                </Link>
                <div className="w-px h-4" style={{ background: '#E8E4DC' }} aria-hidden />
                {signOutButton}
              </>
            ) : (
              <Link
                href="/login"
                className="flex items-center gap-1.5 px-5 py-2 rounded-lg text-sm font-bold"
                style={{ background: '#0F1F15', color: '#F9F7F2', transition: 'background 0.15s' }}
                onMouseEnter={e => (e.currentTarget.style.background = '#4A7C59')}
                onMouseLeave={e => (e.currentTarget.style.background = '#0F1F15')}
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5">
                  <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A3 3 0 1 0 13 9h-3V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                </svg>
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile right: compact auth + hamburger */}
          <div className="flex md:hidden items-center gap-2">
            {user ? (
              <Link
                href="/dashboard"
                onClick={() => setOpen(false)}
                aria-label="My Bookings"
                className="flex items-center justify-center w-8 h-8 rounded-lg"
                style={{ background: '#EBF2ED', color: '#4A7C59' }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </Link>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="px-3.5 py-1.5 rounded-lg text-xs font-bold"
                style={{ background: '#0F1F15', color: '#F9F7F2' }}
              >
                Sign In
              </Link>
            )}

            {/* Hamburger — animated bars to X */}
            <button
              onClick={() => setOpen(o => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex items-center justify-center w-9 h-9 rounded-lg"
              style={{
                background: open ? '#EBF2ED' : 'transparent',
                border: '1px solid',
                borderColor: open ? '#C4D9CA' : '#E8E4DC',
                transition: 'background 0.15s, border-color 0.15s',
              }}
            >
              <span className="flex flex-col justify-center items-center w-4 h-4 gap-[4px]">
                <span style={{
                  display: 'block', width: '16px', height: '2px',
                  background: '#0F1F15', borderRadius: '2px',
                  transition: 'transform 0.2s',
                  transform: open ? 'translateY(6px) rotate(45deg)' : 'none',
                }} />
                <span style={{
                  display: 'block', width: '16px', height: '2px',
                  background: '#0F1F15', borderRadius: '2px',
                  transition: 'opacity 0.2s',
                  opacity: open ? 0 : 1,
                }} />
                <span style={{
                  display: 'block', width: '16px', height: '2px',
                  background: '#0F1F15', borderRadius: '2px',
                  transition: 'transform 0.2s',
                  transform: open ? 'translateY(-6px) rotate(-45deg)' : 'none',
                }} />
              </span>
            </button>
          </div>
        </div>

        {/* ── Mobile dropdown ──────────────────────────────────────────────── */}
        {open && (
          <div
            className="md:hidden"
            style={{ borderTop: '1px solid #E8E4DC', background: '#FFFFFF' }}
          >
            <div className="max-w-7xl mx-auto px-4 py-3 space-y-0.5">

              {/* Page nav links */}
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="mobile-row flex items-center px-3 py-3 rounded-xl text-sm font-semibold"
                  style={{ color: '#374151' }}
                >
                  {link.label}
                </Link>
              ))}

              {/* Divider */}
              <div className="py-1">
                <div style={{ borderTop: '1px solid #F0EDE8' }} />
              </div>

              {/* Auth section */}
              {user ? (
                <>
                  {isAdmin && (
                    <Link
                      href="/admin"
                      onClick={() => setOpen(false)}
                      className="mobile-row flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold"
                      style={{ color: '#374151' }}
                    >
                      <span
                        className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold shrink-0"
                        style={{ background: '#FDF8EF', color: '#C8A96E' }}
                      >
                        A
                      </span>
                      Admin Panel
                    </Link>
                  )}

                  <Link
                    href="/dashboard"
                    onClick={() => setOpen(false)}
                    className="mobile-row flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-semibold"
                    style={{ color: '#374151' }}
                  >
                    <span
                      className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                      style={{ background: '#EBF2ED', color: '#4A7C59' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-3.5 h-3.5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                    </span>
                    My Bookings
                  </Link>

                  <div className="px-3 py-2.5">
                    {signOutButton}
                  </div>
                </>
              ) : (
                <div className="px-3 pt-1 pb-2">
                  <Link
                    href="/login"
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold"
                    style={{ background: '#0F1F15', color: '#F9F7F2' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                      <path fillRule="evenodd" d="M10 1a4.5 4.5 0 0 0-4.5 4.5V9H5a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6a2 2 0 0 0-2-2h-.5V5.5A3 3 0 1 0 13 9h-3V5.5A4.5 4.5 0 0 0 10 1Zm3 8V5.5a3 3 0 1 0-6 0V9h6Z" clipRule="evenodd" />
                    </svg>
                    Sign In
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Spacer — pushes page content below the fixed 64px nav */}
      <div className="h-16" aria-hidden />
    </>
  )
}
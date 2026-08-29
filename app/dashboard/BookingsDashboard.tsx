// components/BookingsDashboard.tsx
'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'

type Booking = {
  id: string
  status: string | null
  scheduled_date: string | null
  created_at: string
  services: { name: string; price: number } | null
}

const STATUS_STYLES = {
  pending: {
    rail: 'bg-amber-400',
    boxBg: 'bg-amber-50/50',
    boxBorder: 'border-amber-200/50',
    badgeBg: 'bg-amber-100/50',
    badgeBorder: 'border-amber-200',
    text: 'text-amber-800',
    dot: 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]',
    label: 'Pending',
  },
  scheduled: {
    rail: 'bg-[#4A7C59]',
    boxBg: 'bg-[#EBF2ED]/60',
    boxBorder: 'border-[#C4D9CA]/60',
    badgeBg: 'bg-[#EBF2ED]',
    badgeBorder: 'border-[#C4D9CA]',
    text: 'text-[#1B4332]',
    dot: 'bg-[#4A7C59] shadow-[0_0_8px_rgba(74,124,89,0.5)]',
    label: 'Scheduled',
  },
  completed: {
    rail: 'bg-emerald-500',
    boxBg: 'bg-emerald-50/50',
    boxBorder: 'border-emerald-200/50',
    badgeBg: 'bg-emerald-100/50',
    badgeBorder: 'border-emerald-200',
    text: 'text-emerald-800',
    dot: 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]',
    label: 'Completed',
  },
  cancelled: {
    rail: 'bg-zinc-300',
    boxBg: 'bg-zinc-50/80',
    boxBorder: 'border-zinc-200/80',
    badgeBg: 'bg-zinc-100',
    badgeBorder: 'border-zinc-200',
    text: 'text-zinc-600',
    dot: 'bg-zinc-400',
    label: 'Cancelled',
  },
} as const

type StatusKey = keyof typeof STATUS_STYLES
const UPCOMING_STATUSES: StatusKey[] = ['pending', 'scheduled']

function relativeDay(dateStr: string) {
  const target = new Date(dateStr)
  const today = new Date()
  const targetMid = Date.UTC(target.getFullYear(), target.getMonth(), target.getDate())
  const todayMid = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate())
  const diffDays = Math.round((targetMid - todayMid) / 86400000)

  if (diffDays < 0) return { label: 'Overdue', days: diffDays }
  if (diffDays === 0) return { label: 'Today', days: diffDays }
  if (diffDays === 1) return { label: 'Tomorrow', days: diffDays }
  if (diffDays < 7) return { label: `In ${diffDays} days`, days: diffDays }
  return { label: new Intl.RelativeTimeFormat('en', { numeric: 'auto' }).format(diffDays, 'day'), days: diffDays }
}

export default function BookingsDashboard({ bookings, userEmail }: { bookings: Booking[]; userEmail: string }) {
  const [tab, setTab] = useState<'upcoming' | 'past' | 'all'>('upcoming')
  const [query, setQuery] = useState('')

  const normalized = useMemo(
    () => bookings.map(b => ({ ...b, status: ((b.status as StatusKey) in STATUS_STYLES ? b.status : 'pending') as StatusKey })),
    [bookings]
  )

  const upcoming = useMemo(
    () =>
      normalized
        .filter(b => UPCOMING_STATUSES.includes(b.status))
        .sort((a, b) => {
          if (!a.scheduled_date) return 1
          if (!b.scheduled_date) return -1
          return new Date(a.scheduled_date).getTime() - new Date(b.scheduled_date).getTime()
        }),
    [normalized]
  )

  const past = useMemo(
    () =>
      normalized
        .filter(b => !UPCOMING_STATUSES.includes(b.status))
        .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [normalized]
  )

  const nextAppointment = upcoming.find(b => b.scheduled_date && relativeDay(b.scheduled_date).days >= 0) ?? null
  const totalSpent = normalized.filter(b => b.status === 'completed').reduce((sum, b) => sum + (b.services?.price || 0), 0)

  const listForTab = tab === 'upcoming' ? upcoming : tab === 'past' ? past : normalized

  const filtered = useMemo(() => {
    if (!query.trim()) return listForTab
    const q = query.toLowerCase()
    return listForTab.filter(b => (b.services?.name || '').toLowerCase().includes(q) || b.id.toLowerCase().includes(q))
  }, [listForTab, query])

  const tabs = [
    { key: 'upcoming' as const, label: 'Upcoming', count: upcoming.length },
    { key: 'past' as const, label: 'Past', count: past.length },
    { key: 'all' as const, label: 'All', count: normalized.length },
  ]

  return (
    <>
      {/* HEADER */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#0F1F15] to-[#162D1D] border-b border-[#23402B]">
        <div className="absolute inset-0 pointer-events-none flex justify-center" aria-hidden>
          <div className="absolute -top-32 w-[800px] h-[500px] bg-[#4A7C59]/20 rounded-full blur-[120px] mix-blend-screen" />
        </div>
        <div className="relative max-w-[1000px] mx-auto px-6 pt-20 pb-16 flex flex-col items-center text-center">
          <div className="inline-flex items-center justify-center space-x-2 mb-4">
            <span className="h-px w-6 bg-gradient-to-r from-transparent to-[#C8A96E]" />
            <p className="text-[0.7rem] font-bold uppercase tracking-[0.2em] text-[#C8A96E]">Customer Portal</p>
            <span className="h-px w-6 bg-gradient-to-l from-transparent to-[#C8A96E]" />
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-3 drop-shadow-sm">My Bookings</h1>
          {userEmail && (
            <p className="text-[0.95rem] font-medium text-[#C4D9CA]/80 max-w-md">
              Managing appointments for <span className="text-white">{userEmail}</span>
            </p>
          )}
        </div>
      </div>

      <main className="max-w-[900px] mx-auto px-6 pb-24 -mt-8 relative z-10">

        {/* NEXT APPOINTMENT SPOTLIGHT — answers the #1 question first */}
        {nextAppointment && nextAppointment.scheduled_date && (
          <div className="mb-8 rounded-2xl bg-white border border-[#E8E4DC] shadow-[0_12px_32px_-8px_rgba(15,31,21,0.12)] overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center gap-5 p-6">
              <div className="shrink-0 w-14 h-14 rounded-xl bg-[#0F1F15] flex items-center justify-center">
                <svg className="w-6 h-6 text-[#C8A96E]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[0.7rem] font-bold uppercase tracking-[0.15em] text-[#4A7C59] mb-1">Your Next Appointment</p>
                <h2 className="text-lg font-bold text-[#0F1F15] truncate">
                  {nextAppointment.services?.name || 'EcoGuard Signature Service'}
                </h2>
                <p className="text-[0.85rem] text-[#6B7A6E] mt-0.5">
                  {new Date(nextAppointment.scheduled_date).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                </p>
              </div>
              <div className="shrink-0">
                <span className="inline-flex items-center px-3 py-1.5 rounded-full text-[0.75rem] font-bold bg-[#EBF2ED] text-[#1B4332] border border-[#C4D9CA]">
                  {relativeDay(nextAppointment.scheduled_date).label}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* AT-A-GLANCE STATS */}
        {normalized.length > 0 && (
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-center">
              <p className="text-xl font-black text-[#0F1F15]">{normalized.length}</p>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#6B7A6E] mt-0.5">Total Bookings</p>
            </div>
            <div className="bg-white border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-center">
              <p className="text-xl font-black text-[#0F1F15]">{normalized.filter(b => b.status === 'completed').length}</p>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#6B7A6E] mt-0.5">Completed</p>
            </div>
            <div className="bg-white border border-[#E8E4DC] rounded-xl px-4 py-3.5 text-center">
              <p className="text-xl font-black text-[#0F1F15]">${totalSpent.toFixed(0)}</p>
              <p className="text-[0.7rem] font-semibold uppercase tracking-wide text-[#6B7A6E] mt-0.5">Total Spent</p>
            </div>
          </div>
        )}

        {/* TABS + SEARCH */}
        {normalized.length > 0 && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <div className="inline-flex p-1 bg-[#EBF2ED]/70 rounded-xl border border-[#C4D9CA]/50 self-start">
              {tabs.map(t => (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`px-4 py-2 rounded-lg text-[0.8rem] font-bold transition-all ${
                    tab === t.key ? 'bg-white text-[#0F1F15] shadow-sm' : 'text-[#4A7C59] hover:text-[#0F1F15]'
                  }`}
                >
                  {t.label} <span className="opacity-60">({t.count})</span>
                </button>
              ))}
            </div>

            <div className="relative">
              <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA89F]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z" />
              </svg>
              <input
                type="text"
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search by service or ID"
                className="pl-9 pr-4 py-2.5 rounded-lg text-[0.85rem] border border-[#E8E4DC] bg-white focus:outline-none focus:ring-2 focus:ring-[#4A7C59] w-full sm:w-64"
              />
            </div>
          </div>
        )}

        {/* LIST */}
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map(booking => {
              const config = STATUS_STYLES[booking.status]
              return (
                <div
                  key={booking.id}
                  className="relative bg-white border border-[#E8E4DC] rounded-2xl overflow-hidden shadow-[0_2px_10px_-4px_rgba(15,31,21,0.04)] hover:shadow-[0_12px_30px_-8px_rgba(74,124,89,0.15)] hover:-translate-y-[2px] transition-all duration-300 group"
                >
                  <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${config.rail}`} aria-hidden />
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pl-8 pr-6 py-5">
                    <div className="min-w-0 flex-1">
                      <h3 className="font-bold text-[1.05rem] text-[#0F1F15] tracking-tight truncate group-hover:text-[#4A7C59] transition-colors">
                        {booking.services?.name || 'EcoGuard Signature Service'}
                      </h3>
                      <div className="flex flex-wrap items-center gap-x-5 gap-y-1.5 mt-2">
                        <div className="flex items-center gap-1.5 text-[0.82rem] text-[#6B7A6E]">
                          <svg className="w-3.5 h-3.5 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <span className="font-medium">
                            {booking.scheduled_date
                              ? new Date(booking.scheduled_date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
                              : 'Pending Confirmation'}
                          </span>
                        </div>
                        <span className="text-[0.75rem] font-mono tracking-wider uppercase text-[#9CA89F]">
                          #{booking.id.slice(0, 8)}
                        </span>
                      </div>
                    </div>

                    <div className={`flex items-center justify-between sm:justify-start gap-5 px-5 py-3 rounded-xl border shrink-0 ${config.boxBg} ${config.boxBorder}`}>
                      <div>
                        <p className="text-[0.62rem] font-bold uppercase tracking-[0.15em] text-[#6B7A6E]/80 mb-0.5">Amount</p>
                        <p className="text-lg font-black tracking-tight text-[#0F1F15] leading-none">
                          ${booking.services?.price?.toFixed(2) || '0.00'}
                        </p>
                      </div>
                      <div className={`w-px h-8 ${config.boxBorder}`} aria-hidden />
                      <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[0.7rem] font-bold border shadow-sm shrink-0 ${config.badgeBg} ${config.badgeBorder} ${config.text}`}>
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${config.dot}`} />
                        {config.label}
                      </span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        ) : normalized.length > 0 ? (
          <div className="text-center py-16 px-6 bg-white border border-[#E8E4DC] rounded-2xl">
            <p className="text-[0.95rem] font-semibold text-[#0F1F15]">No matching bookings</p>
            <p className="text-[0.85rem] text-[#6B7A6E] mt-1">Try a different search term or check another tab.</p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center py-24 px-6 bg-white border border-[#E8E4DC] rounded-3xl shadow-[0_4px_20px_-4px_rgba(15,31,21,0.03)] relative overflow-hidden">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-[#EBF2ED] rounded-full blur-[80px] pointer-events-none" />
            <div className="relative z-10 w-16 h-16 rounded-2xl bg-gradient-to-br from-[#EBF2ED] to-[#C4D9CA]/30 border border-[#C4D9CA] flex items-center justify-center mb-6 shadow-inner">
              <svg className="w-7 h-7 text-[#4A7C59]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
              </svg>
            </div>
            <h3 className="relative z-10 text-xl font-extrabold tracking-tight text-[#0F1F15]">No bookings yet</h3>
            <p className="relative z-10 text-[0.95rem] text-[#6B7A6E] mt-2 max-w-sm leading-relaxed">
              Your confirmed EcoGuard appointments and service history will appear here seamlessly once scheduled.
            </p>
            <Link href="/" className="relative z-10 mt-8 inline-flex items-center gap-2 px-8 py-3.5 rounded-xl text-[0.9rem] font-bold text-white bg-gradient-to-b from-[#4A7C59] to-[#3A6346] shadow-[0_4px_14px_rgba(74,124,89,0.25)] hover:shadow-[0_6px_20px_rgba(74,124,89,0.35)] hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-[#4A7C59] focus:ring-offset-2 focus:ring-offset-[#F9F8F6] transition-all active:scale-[0.98]">
              Browse Services
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}

        {normalized.length > 0 && (
          <div className="mt-10 flex justify-center">
            <Link href="/" className="inline-flex items-center gap-2 text-[0.9rem] font-bold text-[#4A7C59] hover:text-[#0F1F15] transition-colors group px-6 py-3 rounded-full hover:bg-[#EBF2ED]/50">
              Book another service
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        )}
      </main>
    </>
  )
}
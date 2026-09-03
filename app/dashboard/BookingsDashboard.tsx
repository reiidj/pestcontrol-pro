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
    label: 'Pending',
    dot: 'bg-amber-500',
    text: 'text-amber-700',
    bg: 'bg-amber-50',
    border: 'border-amber-200',
  },
  scheduled: {
    label: 'Scheduled',
    dot: 'bg-[#4ADE80]',
    text: 'text-[#3A6346]',
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#C4D9CA]',
  },
  completed: {
    label: 'Completed',
    dot: 'bg-[#3A6346]',
    text: 'text-[#3A6346]',
    bg: 'bg-[#F0FDF4]',
    border: 'border-[#C4D9CA]',
  },
  cancelled: {
    label: 'Cancelled',
    dot: 'bg-zinc-400',
    text: 'text-zinc-600',
    bg: 'bg-zinc-50',
    border: 'border-zinc-200',
  },
} as const

type StatusKey = keyof typeof STATUS_STYLES

const UPCOMING_STATUSES: StatusKey[] = ['pending', 'scheduled']

function relativeDay(dateStr: string) {
  const target = new Date(dateStr)
  const today = new Date()

  const targetMid = Date.UTC(
    target.getFullYear(),
    target.getMonth(),
    target.getDate()
  )

  const todayMid = Date.UTC(
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  )

  const diffDays = Math.round(
    (targetMid - todayMid) / 86400000
  )

  if (diffDays < 0) return { label: 'Overdue', days: diffDays }
  if (diffDays === 0) return { label: 'Today', days: diffDays }
  if (diffDays === 1) return { label: 'Tomorrow', days: diffDays }
  if (diffDays < 7) return { label: `In ${diffDays} days`, days: diffDays }

  return {
    label: new Intl.RelativeTimeFormat('en', {
      numeric: 'auto',
    }).format(diffDays, 'day'),
    days: diffDays,
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

function formatShortDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function BookingsDashboard({
  bookings,
  userEmail,
}: {
  bookings: Booking[]
  userEmail: string
}) {
  const [tab, setTab] = useState<'upcoming' | 'past'>('upcoming')
  const [query, setQuery] = useState('')

  const normalized = useMemo(
    () =>
      bookings.map((booking) => ({
        ...booking,
        status: (
          (booking.status as StatusKey) in STATUS_STYLES
            ? booking.status
            : 'pending'
        ) as StatusKey,
      })),
    [bookings]
  )

  const upcoming = useMemo(
    () =>
      normalized
        .filter((booking) =>
          UPCOMING_STATUSES.includes(booking.status)
        )
        .sort((a, b) => {
          if (!a.scheduled_date) return 1
          if (!b.scheduled_date) return -1

          return (
            new Date(a.scheduled_date).getTime() -
            new Date(b.scheduled_date).getTime()
          )
        }),
    [normalized]
  )

  const past = useMemo(
    () =>
      normalized
        .filter(
          (booking) =>
            !UPCOMING_STATUSES.includes(booking.status)
        )
        .sort(
          (a, b) =>
            new Date(b.created_at).getTime() -
            new Date(a.created_at).getTime()
        ),
    [normalized]
  )

  const nextAppointment =
    upcoming.find(
      (booking) =>
        booking.scheduled_date &&
        relativeDay(booking.scheduled_date).days >= 0
    ) ?? null

  const currentBookings =
    tab === 'upcoming' ? upcoming : past

  const filtered = useMemo(() => {
    if (!query.trim()) return currentBookings

    const q = query.toLowerCase()

    return currentBookings.filter(
      (booking) =>
        (booking.services?.name || '')
          .toLowerCase()
          .includes(q) ||
        booking.id.toLowerCase().includes(q)
    )
  }, [currentBookings, query])

  return (
    <div className="min-h-screen bg-[#F9F7F2]">

      {/* PAGE HEADER */}
      <header className="bg-[#171717] text-[#F9F7F2]">
        <div className="mx-auto max-w-6xl px-6 py-14 sm:py-16 lg:px-8">
          <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">

            <div>
              <div className="mb-5 flex items-center gap-3">
                <span className="h-px w-8 bg-[#4ADE80]" />

                <p className="text-[0.65rem] font-black uppercase tracking-[0.2em] text-[#4ADE80]">
                  Customer Portal
                </p>
              </div>

              <h1 className="text-4xl font-black leading-none tracking-[-0.035em] sm:text-5xl">
                My Bookings
              </h1>

              <p className="mt-4 max-w-md text-sm leading-6 text-[#F9F7F2]/50">
                Manage your NestGuard appointments and view your
                service history.
              </p>
            </div>

            {userEmail && (
              <div className="border-l border-[#F9F7F2]/10 pl-5">
                <p className="mb-1 text-[0.6rem] font-black uppercase tracking-[0.15em] text-[#F9F7F2]/35">
                  Signed in as
                </p>

                <p className="max-w-xs truncate text-sm font-medium text-[#F9F7F2]/75">
                  {userEmail}
                </p>
              </div>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-24 lg:px-8">

        {/* NEXT APPOINTMENT */}
        {nextAppointment?.scheduled_date && (
          <section className="-mt-6 relative z-10 mb-16">
            <div className="overflow-hidden border border-[#171717]/10 bg-white shadow-[0_16px_40px_-20px_rgba(23,23,23,0.25)]">

              {/* Green top bar */}
              <div className="h-1.5 bg-[#4ADE80]" />

              <div className="p-6 sm:p-8 lg:p-10">

                <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
                  <div>
                    <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#3A6346]">
                      Next Appointment
                    </p>

                    <h2 className="text-2xl font-black tracking-[-0.025em] text-[#171717] sm:text-3xl">
                      {nextAppointment.services?.name ||
                        'NestGuard Service'}
                    </h2>
                  </div>

                  <span className="inline-flex w-fit items-center gap-2 border border-[#C4D9CA] bg-[#F0FDF4] px-3 py-2 text-xs font-black uppercase tracking-wide text-[#3A6346]">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#4ADE80]" />
                    {relativeDay(
                      nextAppointment.scheduled_date
                    ).label}
                  </span>
                </div>

                {/* Appointment details */}
                <div className="grid gap-6 border-t border-[#171717]/10 pt-7 sm:grid-cols-3">

                  <div>
                    <p className="mb-2 text-[0.6rem] font-black uppercase tracking-[0.15em] text-[#171717]/35">
                      Date
                    </p>

                    <p className="text-sm font-bold text-[#171717]">
                      {formatDate(
                        nextAppointment.scheduled_date
                      )}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[0.6rem] font-black uppercase tracking-[0.15em] text-[#171717]/35">
                      Service
                    </p>

                    <p className="text-sm font-bold text-[#171717]">
                      {nextAppointment.services?.name ||
                        'NestGuard Service'}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[0.6rem] font-black uppercase tracking-[0.15em] text-[#171717]/35">
                      Booking ID
                    </p>

                    <p className="font-mono text-sm font-bold uppercase text-[#171717]/60">
                      #{nextAppointment.id.slice(0, 8)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* BOOKINGS SECTION */}
        <section>

          {/* Section heading */}
          <div className="mb-8 flex flex-col justify-between gap-5 border-b border-[#171717]/10 pb-6 sm:flex-row sm:items-end">

            <div>
              <br></br>
              <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#3A6346]">
                Appointments
              </p>

              <h2 className="text-2xl font-black tracking-[-0.025em] text-[#171717] sm:text-3xl">
                Your bookings
              </h2>
            </div>

            {normalized.length > 0 && (
              <div className="flex items-center gap-1 border-b border-[#171717]/10">

                <button
                  onClick={() => setTab('upcoming')}
                  className={`border-b-2 px-4 py-3 text-xs font-black uppercase tracking-wide transition-colors ${
                    tab === 'upcoming'
                      ? 'border-[#4ADE80] text-[#171717]'
                      : 'border-transparent text-[#171717]/40 hover:text-[#171717]'
                  }`}
                >
                  Upcoming
                  <span className="ml-2 text-[#171717]/35">
                    {upcoming.length}
                  </span>
                </button>

                <button
                  onClick={() => setTab('past')}
                  className={`border-b-2 px-4 py-3 text-xs font-black uppercase tracking-wide transition-colors ${
                    tab === 'past'
                      ? 'border-[#4ADE80] text-[#171717]'
                      : 'border-transparent text-[#171717]/40 hover:text-[#171717]'
                  }`}
                >
                  History
                  <span className="ml-2 text-[#171717]/35">
                    {past.length}
                  </span>
                </button>

              </div>
            )}
          </div>

          {/* Search */}
          {normalized.length > 3 && (
            <div className="relative mb-6 max-w-sm">
              <svg
                className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#171717]/30"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M21 21l-4.35-4.35M17 10.5A6.5 6.5 0 114 10.5a6.5 6.5 0 0113 0z"
                />
              </svg>

              <input
                type="text"
                value={query}
                onChange={(e) =>
                  setQuery(e.target.value)
                }
                placeholder="Search bookings..."
                className="w-full border border-[#171717]/10 bg-white py-3 pl-10 pr-4 text-sm text-[#171717] outline-none transition-colors placeholder:text-[#171717]/30 focus:border-[#3A6346]"
              />
            </div>
          )}

          {/* BOOKING LIST */}
          {filtered.length > 0 ? (
            <div className="space-y-3">
              {filtered.map((booking) => {
                const config =
                  STATUS_STYLES[booking.status]

                return (
                  <article
                    key={booking.id}
                    className="group border border-[#171717]/10 bg-white transition-all duration-200 hover:border-[#3A6346]/40"
                  >
                    <div className="flex flex-col gap-5 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">

                      {/* Booking information */}
                      <div className="min-w-0">

                        <div className="mb-2 flex items-center gap-3">
                          <span
                            className={`h-2 w-2 shrink-0 rounded-full ${config.dot}`}
                          />

                          <span
                            className={`text-[0.6rem] font-black uppercase tracking-[0.15em] ${config.text}`}
                          >
                            {config.label}
                          </span>
                        </div>

                        <h3 className="truncate text-base font-black tracking-[-0.015em] text-[#171717] group-hover:text-[#3A6346]">
                          {booking.services?.name ||
                            'NestGuard Service'}
                        </h3>

                        <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1 text-xs text-[#171717]/40">
                          <span>
                            {booking.scheduled_date
                              ? formatShortDate(
                                  booking.scheduled_date
                                )
                              : 'Date pending'}
                          </span>

                          <span className="font-mono uppercase">
                            #{booking.id.slice(0, 8)}
                          </span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="flex items-center justify-between border-t border-[#171717]/10 pt-4 sm:min-w-[150px] sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                        <div className="sm:text-right">
                          <p className="mb-1 text-[0.55rem] font-black uppercase tracking-[0.15em] text-[#171717]/30">
                            Amount
                          </p>

                          <p className="text-lg font-black tracking-[-0.02em] text-[#171717]">
                            $
                            {booking.services?.price?.toFixed(
                              2
                            ) || '0.00'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          ) : normalized.length > 0 ? (
            /* No matching results */
            <div className="border border-[#171717]/10 bg-white px-6 py-16 text-center">
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center border border-[#C4D9CA] bg-[#F0FDF4]">
                <svg
                  className="h-5 w-5 text-[#3A6346]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 12h6m-6 4h4m5-9.5V19a2 2 0 01-2 2H8a2 2 0 01-2-2V5.5A2.5 2.5 0 018.5 3h5A2.5 2.5 0 0116 5.5V6a.5.5 0 01-.5.5h-3A1.5 1.5 0 0111 5v-.5"
                  />
                </svg>
              </div>

              <h3 className="text-base font-black text-[#171717]">
                No bookings found
              </h3>

              <p className="mt-1 text-sm text-[#171717]/45">
                Try another search or switch between upcoming
                and booking history.
              </p>
            </div>
          ) : (
            /* Empty state */
            <div className="border border-[#171717]/10 bg-white px-6 py-20 text-center">

              <div className="mx-auto mb-7 flex h-16 w-16 items-center justify-center bg-[#171717]">
                <svg
                  className="h-7 w-7 text-[#4ADE80]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75zm0 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5"
                  />
                </svg>
              </div>

              <p className="mb-2 text-[0.65rem] font-black uppercase tracking-[0.18em] text-[#3A6346]">
                Get started
              </p>

              <h3 className="text-2xl font-black tracking-[-0.025em] text-[#171717]">
                Your property isn't protected yet.
              </h3>

              <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#171717]/45">
                Choose a NestGuard protection plan and book
                your first treatment in just a few steps.
              </p>

              <Link
                href="/#services"
                className="mt-8 inline-flex items-center gap-3 bg-[#171717] px-6 py-4 text-sm font-black uppercase tracking-wide text-[#F9F7F2] transition-colors hover:bg-[#3A6346]"
              >
                Browse Protection Plans

                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          )}

          {/* Bottom CTA */}
          {normalized.length > 0 && (
            <div className="mt-10 flex items-center justify-between border-t border-[#171717]/10 pt-6">
              <p className="hidden text-xs text-[#171717]/35 sm:block">
                Need another treatment?
              </p>

              <Link
                href="/#services"
                className="group ml-auto inline-flex items-center gap-2 text-xs font-black uppercase tracking-[0.12em] text-[#3A6346]"
              >
                Book another service

                <svg
                  className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2.5}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                  />
                </svg>
              </Link>
            </div>
          )}
        </section>
      </main>
    </div>
  )
}
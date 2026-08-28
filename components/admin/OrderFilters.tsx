'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { Search, Calendar } from 'lucide-react'

export default function OrderFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  // Initialize state from URL if it exists
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [date, setDate] = useState(searchParams.get('date') || '')

  const handleApplyFilters = () => {
    startTransition(() => {
      const params = new URLSearchParams(searchParams)
      
      if (search) params.set('search', search)
      else params.delete('search')
      
      if (date) params.set('date', date)
      else params.delete('date')

      router.push(`?${params.toString()}`)
    })
  }

  const handleClear = () => {
    setSearch('')
    setDate('')
    startTransition(() => {
      router.push('?')
    })
  }

  return (
    <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 p-4 rounded-xl" style={{ background: '#FFFFFF', border: '1px solid var(--fog)' }}>
      {/* Search Input (Email or Order ID) */}
      <div className="relative flex-1 w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          placeholder="Filter by Email or Order ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleApplyFilters()}
          className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border outline-none focus:ring-2 focus:border-transparent transition-all"
          style={{ borderColor: 'var(--fog)', color: 'var(--forest)'}}
        />
      </div>

      {/* Date Input */}
      <div className="relative w-full sm:w-auto">
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full sm:w-40 pl-3 pr-4 py-2 text-sm rounded-lg border outline-none focus:ring-2 transition-all"
          style={{ borderColor: 'var(--fog)', color: 'var(--forest)' }}
        />
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 w-full sm:w-auto">
        <button
          onClick={handleApplyFilters}
          disabled={isPending}
          className="flex-1 sm:flex-none px-4 py-2 text-sm font-bold rounded-lg transition-colors"
          style={{ background: 'var(--sage)', color: '#FFF' }}
        >
          {isPending ? 'Filtering...' : 'Filter'}
        </button>
        {(search || date) && (
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm font-semibold rounded-lg hover:bg-gray-100 transition-colors text-gray-600"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}
'use client'

import { useState, useTransition } from 'react'
import { Bug, X, Loader2, CheckCircle2 } from 'lucide-react'
import { submitIssue } from '@/app/auth/actions'

export default function ReportIssueModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      try {
        await submitIssue(formData)
        setIsSuccess(true)
        setTimeout(() => {
          setIsOpen(false)
          setIsSuccess(false)
        }, 2000)
      } catch (error) {
        console.error(error)
      }
    })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 p-3 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/50 rounded-full shadow-2xl transition-all z-50"
        title="Report an Issue"
      >
        <Bug className="w-5 h-5" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-between items-center p-4 border-b border-zinc-800 bg-zinc-900/50">
              <h3 className="font-semibold text-zinc-100 flex items-center gap-2">
                <Bug className="w-4 h-4 text-emerald-500" />
                Report a Website Issue
              </h3>
              <button onClick={() => setIsOpen(false)} className="text-zinc-500 hover:text-zinc-300">
                <X className="w-5 h-5" />
              </button>
            </div>

            {isSuccess ? (
              <div className="p-8 flex flex-col items-center justify-center text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                <p className="text-zinc-300 font-medium">Issue reported successfully.</p>
                <p className="text-xs text-zinc-500">Our engineering team will look into it.</p>
              </div>
            ) : (
              <form action={handleSubmit} className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Issue Title</label>
                  <input
                    name="title"
                    required
                    placeholder="e.g., Checkout button not working"
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-zinc-300">Description</label>
                  <textarea
                    name="description"
                    required
                    rows={4}
                    placeholder="Please provide details about the issue..."
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-zinc-100 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isPending}
                  className="w-full py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
                >
                  {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
                  Submit Report
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  )
}
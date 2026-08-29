'use client'
import { useState } from 'react'

export default function Quotation() {
  // 1. Define the state to handle UI changes (loading spinner, success message)
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  // 2. Define the handleSubmit function
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault()
  setStatus('loading')

  const form = e.currentTarget
  const formData = new FormData(form)
  const data = Object.fromEntries(formData.entries())

  try {
    const res = await fetch('/api/quote', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      setStatus('success')
      form.reset()
    } else {
      setStatus('error')
    }
  } catch (error) {
    setStatus('error')
  }
}

  return (
    <section id="quote" className="py-24 bg-[#166534] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0H20L0 20M40 40V20L20 40" stroke="currentColor" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" className="text-white" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col lg:flex-row gap-16 items-center">
        
        {/* Left Copy */}
        <div className="flex-1 text-white text-center lg:text-left">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight mb-6">
            Get your free <br className="hidden lg:block" />
            <span className="text-[#4ADE80]">custom estimate.</span>
          </h2>
          <p className="text-lg text-white/80 max-w-xl mx-auto lg:mx-0 mb-8">
            Every property is different. Tell us a bit about your space and your current pest concerns, and our field team will calculate a transparent, flat-rate quote within 24 hours.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-6 text-sm font-medium text-white/90">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              No obligation
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Zero sales calls
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-[#4ADE80]" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
              Accurate pricing
            </div>
          </div>
        </div>

        {/* Right Form Component */}
        <div className="w-full max-w-lg bg-white rounded-2xl p-8 shadow-2xl">
          {/* 3. Render success state if the email sent correctly */}
          {status === 'success' ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-[#F0FDF4] text-[#166534] rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Quotation Sent!</h3>
              <p className="text-gray-500">Check your inbox or spam folder for your customized mock estimate.</p>
              <button 
                onClick={() => setStatus('idle')}
                className="mt-6 text-sm font-bold text-[#166534] hover:underline"
              >
                Send another request
              </button>
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="firstName" className="text-sm font-bold text-gray-700">First Name</label>
                  <input type="text" id="firstName" name="firstName" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#166534] focus:border-transparent outline-none transition-all bg-gray-50" placeholder="John" />
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="lastName" className="text-sm font-bold text-gray-700">Last Name</label>
                  <input type="text" id="lastName" name="lastName" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#166534] focus:border-transparent outline-none transition-all bg-gray-50" placeholder="Doe" />
                </div>
              </div>

              <div className="space-y-1.5">
                <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address</label>
                <input type="email" id="email" name="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#166534] focus:border-transparent outline-none transition-all bg-gray-50" placeholder="john@example.com" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="propertySize" className="text-sm font-bold text-gray-700">Property Size</label>
                  <select id="propertySize" name="propertySize" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#166534] focus:border-transparent outline-none transition-all bg-gray-50 text-gray-600">
                    <option value="under_1500">Under 1,500 sq ft</option>
                    <option value="1500_3000">1,500 - 3,000 sq ft</option>
                    <option value="over_3000">Over 3,000 sq ft</option>
                    <option value="commercial">Commercial</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="issue" className="text-sm font-bold text-gray-700">Primary Issue</label>
                  <select id="issue" name="issue" className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-[#166534] focus:border-transparent outline-none transition-all bg-gray-50 text-gray-600">
                    <option value="general">General Prevention</option>
                    <option value="ants">Ants / Roaches</option>
                    <option value="rodents">Rodents / Mice</option>
                    <option value="wasps">Wasps / Hornets</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>

              {/* 4. Update the button to show a loading state */}
              <button 
                type="submit" 
                disabled={status === 'loading'}
                className="w-full py-4 mt-4 rounded-xl font-bold text-white bg-[#171717] hover:bg-[#166534] shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {status === 'loading' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Sending Estimate...
                  </>
                ) : (
                  'Request Free Estimate'
                )}
              </button>

              {status === 'error' && (
                <p className="text-xs text-center text-red-500 font-bold mt-2">
                  Something went wrong. Please try again.
                </p>
              )}
              <p className="text-xs text-center text-gray-400 font-medium">
                We respect your privacy. No spam, ever.
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
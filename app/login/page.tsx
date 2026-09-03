'use client'

import { useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import { Turnstile } from '@marsidev/react-turnstile'
import { Eye, EyeOff, ShieldCheck, Lock, Mail } from 'lucide-react'
import { login, signup } from '@/app/auth/actions'

function AuthForm() {
  const searchParams = useSearchParams()
  const serverError = searchParams.get('error')
  const serverMessage = searchParams.get('message')

  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [captchaToken, setCaptchaToken] = useState<string>('')
  const [clientError, setClientError] = useState<string | null>(null)

  // Client-side intercept to check passwords instantly
  const handleClientValidation = (e: React.FormEvent<HTMLFormElement>) => {
    setClientError(null)
    const formData = new FormData(e.currentTarget)
    
    if (mode === 'signup') {
      const password = formData.get('password') as string
      const confirmPassword = formData.get('confirmPassword') as string
      if (password !== confirmPassword) {
        e.preventDefault()
        setClientError('Passwords do not match.')
        return
      }
    }

    if (!captchaToken) {
      e.preventDefault()
      setClientError('Please verify the security check.')
      return
    }
  }

  return (
    <div className="w-full max-w-md space-y-6 rounded-2xl border border-zinc-800 bg-zinc-900/60 p-8 backdrop-blur-xl shadow-2xl">
      <div className="text-center space-y-2">
        <div className="inline-flex p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
          <ShieldCheck className="h-7 w-7" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight">NestGuard Portal</h1>
        <p className="text-sm text-zinc-400">
          {mode === 'signin' ? 'Sign in to access your dashboard' : 'Create an account for environmental protection'}
        </p>
      </div>

      <div className="grid grid-cols-2 p-1 bg-zinc-950/80 border border-zinc-800 rounded-xl text-sm font-medium">
        <button
          type="button"
          onClick={() => { setMode('signin'); setClientError(null); }}
          className={`py-2 rounded-lg transition-colors ${mode === 'signin' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => { setMode('signup'); setClientError(null); }}
          className={`py-2 rounded-lg transition-colors ${mode === 'signup' ? 'bg-zinc-800 text-white shadow' : 'text-zinc-400 hover:text-white'}`}
        >
          Sign Up
        </button>
      </div>

      {(clientError || serverError) && (
        <div className="p-3 text-xs rounded-lg border border-rose-500/30 bg-rose-500/10 text-rose-300">
          {clientError || serverError}
        </div>
      )}
      
      {serverMessage && (
        <div className="p-3 text-xs rounded-lg border border-emerald-500/30 bg-emerald-500/10 text-emerald-300">
          {serverMessage}
        </div>
      )}

      {/* Native form action routes seamlessly to your redirect logic */}
      <form action={mode === 'signin' ? login : signup} onSubmit={handleClientValidation} className="space-y-4">
        
        {/* Hidden input securely passes the token into formData */}
        <input type="hidden" name="captchaToken" value={captchaToken} />

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">Email Address</label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              name="email"
              type="email"
              required
              placeholder="name@organization.com"
              className="w-full pl-10 pr-4 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-zinc-300">Password</label>
          <div className="relative">
            <Lock className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
            <input
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-10 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-3 text-zinc-500 hover:text-zinc-300"
            >
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        </div>

        {mode === 'signup' && (
          <div className="space-y-1.5 transition-all">
            <label className="text-xs font-semibold text-zinc-300">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-3 h-4 w-4 text-zinc-500" />
              <input
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-10 py-2.5 bg-zinc-950/50 border border-zinc-800 rounded-lg text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-emerald-500 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3.5 top-3 text-zinc-500 hover:text-zinc-300"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
        )}

        <div className="pt-2 flex justify-center">
          <Turnstile
            siteKey={process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY!}
            onSuccess={(token) => setCaptchaToken(token)}
            onError={() => setClientError('Captcha verification failed. Refresh page.')}
            onExpire={() => setCaptchaToken('')}
            options={{ theme: 'dark' }}
          />
        </div>

        <button
          type="submit"
          className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-emerald-900/20"
        >
          {mode === 'signin' ? 'Sign In' : 'Create Account'}
        </button>
      </form>
    </div>
  )
}

// Next.js requires components accessing useSearchParams to be wrapped in a Suspense boundary
export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-950 px-4 py-12 text-zinc-100">
      <Suspense fallback={<div className="text-zinc-500 text-sm">Loading security portal...</div>}>
        <AuthForm />
      </Suspense>
    </div>
  )
}
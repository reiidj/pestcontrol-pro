import { login, signup } from '@/app/auth/actions'
import Link from 'next/link'

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

export default async function LoginPage(props: {
  searchParams: SearchParams;
}) {
  const searchParams = await props.searchParams;
  
  // Extract and type-cast the parameters safely
  const error = searchParams.error as string | undefined;
  const message = searchParams.message as string | undefined;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F9F7F2] px-4 font-sans text-[#0F1F15]">
      
      {/* Feedback Messages */}
          {error && (
            <div className="p-4 text-[13px] font-medium bg-[#FFF0F0] text-[#9B1C1C] rounded-xl border border-[#FECDCD] text-center">
              {error}
            </div>
          )}
          {message && (
            <div className="p-4 text-[13px] font-medium bg-[#F0FDF4] text-[#166534] rounded-xl border border-[#bbf7d0] text-center">
              {message}
            </div>
          )}

      {/* Optional: Back to Home Link */}
      <div className="absolute top-8 left-8 md:top-10 md:left-10">
        <Link 
          href="/" 
          className="text-[10px] font-bold uppercase tracking-widest text-[#6B7A6E] hover:text-[#0F1F15] transition-colors flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
          </svg>
          Back to Site
        </Link>
      </div>

      <div className="w-full max-w-md p-8 sm:p-10 bg-white rounded-3xl shadow-[0_8px_30px_rgba(15,31,21,0.04)] border border-[#E8E4DC]">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-10">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4A7C59]">
            Secure Portal
          </p>
          <h1 className="text-3xl font-black tracking-tight text-[#0F1F15]">
            PestControl Pro
          </h1>
          <p className="text-sm font-medium text-[#6B7A6E]">
            Sign in to manage your appointments and service history.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-5">
          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-[#6B7A6E]" htmlFor="email">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-3 bg-[#F9F7F2]/50 border border-[#E8E4DC] rounded-xl text-sm font-medium text-[#0F1F15] focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="space-y-2">
            <label className="block text-[11px] font-bold uppercase tracking-widest text-[#6B7A6E]" htmlFor="password">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-[#F9F7F2]/50 border border-[#E8E4DC] rounded-xl text-sm font-medium text-[#0F1F15] focus:ring-2 focus:ring-[#4A7C59] focus:border-transparent outline-none transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Feedback Messages */}
          {searchParams?.error && (
            <div className="p-4 text-[13px] font-medium bg-[#FFF0F0] text-[#9B1C1C] rounded-xl border border-[#FECDCD] text-center">
              {searchParams.error}
            </div>
          )}
          {searchParams?.message && (
            <div className="p-4 text-[13px] font-medium bg-[#F0FDF4] text-[#166534] rounded-xl border border-[#bbf7d0] text-center">
              {searchParams.message}
            </div>
          )}

          <div className="flex flex-col gap-3 pt-6">
            <button
              formAction={login}
              className="w-full py-3.5 bg-[#0F1F15] text-white rounded-xl text-xs font-bold uppercase tracking-widest hover:bg-[#4A7C59] transition-colors shadow-md"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="w-full py-3.5 bg-white text-[#0F1F15] border-2 border-[#E8E4DC] rounded-xl text-xs font-bold uppercase tracking-widest hover:border-[#4A7C59] transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
import { login, signup } from '@/app/auth/actions'

export default async function LoginPage(props: {
  searchParams: Promise<{ message: string; error: string }>;
}) {
  // 1. Await the promised searchParams (Next.js 15 requirement)
  const searchParams = await props.searchParams;
  const { message, error } = searchParams;
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-sm border border-slate-200">
        
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">PestControl Pro</h1>
          <p className="text-slate-500">Sign in to manage your pest control services</p>
        </div>

        {/* The Form - notice we don't need 'onSubmit' because we use 'formAction' */}
        <form className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="you@example.com"
              className="w-full px-4 py-2 border rounded-lg  text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium text-slate-700" htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="••••••••"
              className="w-full px-4 py-2 border rounded-lg  text-slate-700 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>

          {/* Feedback Messages from URL Params */}
          {searchParams?.error && (
            <p className="p-3 text-sm bg-red-50 text-red-600 rounded-lg border border-red-100 text-center">
              {searchParams.error}
            </p>
          )}
          {searchParams?.message && (
            <p className="p-3 text-sm bg-green-50 text-green-700 rounded-lg border border-green-100 text-center">
              {searchParams.message}
            </p>
          )}

          <div className="flex flex-col gap-2 pt-4">
            <button
              formAction={login}
              className="w-full py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-md shadow-blue-100"
            >
              Sign In
            </button>
            <button
              formAction={signup}
              className="w-full py-2 bg-white text-slate-700 border border-slate-300 rounded-lg font-semibold hover:bg-slate-50 transition-colors"
            >
              Create Account
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
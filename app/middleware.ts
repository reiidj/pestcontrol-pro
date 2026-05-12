import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'

export async function middleware(request: NextRequest) {
  // 1. Update the session (Standard Supabase requirement)
  const response = await updateSession(request)
  
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  const url = request.nextUrl.clone()

  // 2. Protect /admin routes
  if (url.pathname.startsWith('/admin')) {
    if (!user || user.app_metadata?.role !== 'admin') {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // 3. Protect /app (Customer) routes
  if (url.pathname.startsWith('/app')) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
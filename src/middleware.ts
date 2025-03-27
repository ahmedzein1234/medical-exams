import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req: request, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check auth condition
  if (session?.user) {
    // If the user is signed in and the current path is / or auth related,
    // redirect the user to /dashboard
    if (
      request.nextUrl.pathname === '/' ||
      request.nextUrl.pathname.startsWith('/auth')
    ) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  } else {
    // If the user is not signed in and the current path is not / or auth related,
    // redirect the user to /
    if (
      !request.nextUrl.pathname.startsWith('/auth') &&
      request.nextUrl.pathname !== '/'
    ) {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
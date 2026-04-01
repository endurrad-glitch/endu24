import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/
const MAINTENANCE_QUERY_KEY = 'maintenance'
const MAINTENANCE_BYPASS_COOKIE = 'endu24_maintenance_bypass'

const isMaintenanceModeEnabled = () => process.env.MAINTENANCE_MODE === 'true'
const getAdminToken = () => process.env.MAINTENANCE_ADMIN_TOKEN

const isPublicPath = (pathname: string) =>
  pathname === '/maintenance' ||
  pathname.startsWith('/api') ||
  pathname.startsWith('/_next') ||
  pathname === '/favicon.ico' ||
  pathname === '/robots.txt' ||
  pathname === '/sitemap.xml' ||
  PUBLIC_FILE.test(pathname)

const withBypassCookie = (response: NextResponse, token: string) => {
  response.cookies.set(MAINTENANCE_BYPASS_COOKIE, token, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    path: '/',
    maxAge: 60 * 60 * 12,
  })

  return response
}

export function proxy(request: NextRequest) {
  if (!isMaintenanceModeEnabled()) {
    return NextResponse.next()
  }

  const adminToken = getAdminToken()
  const currentBypassCookie = request.cookies.get(MAINTENANCE_BYPASS_COOKIE)?.value
  const bypassFromCookie = Boolean(adminToken && currentBypassCookie === adminToken)

  if (bypassFromCookie) {
    return NextResponse.next()
  }

  if (adminToken) {
    const incomingToken = request.nextUrl.searchParams.get(MAINTENANCE_QUERY_KEY)

    if (incomingToken === adminToken) {
      const cleanUrl = request.nextUrl.clone()
      cleanUrl.searchParams.delete(MAINTENANCE_QUERY_KEY)

      const redirectResponse = NextResponse.redirect(cleanUrl)
      return withBypassCookie(redirectResponse, adminToken)
    }
  }

  const { pathname } = request.nextUrl

  if (isPublicPath(pathname)) {
    return NextResponse.next()
  }

  const maintenanceUrl = request.nextUrl.clone()
  maintenanceUrl.pathname = '/maintenance'
  maintenanceUrl.search = ''

  return NextResponse.rewrite(maintenanceUrl)
}

export const config = {
  matcher: '/:path*',
}

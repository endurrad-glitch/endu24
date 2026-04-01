import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PUBLIC_FILE = /\.(.*)$/

const isMaintenanceModeEnabled = () => process.env.MAINTENANCE_MODE === 'true'

export function proxy(request: NextRequest) {
  if (!isMaintenanceModeEnabled()) {
    return NextResponse.next()
  }

  const { pathname } = request.nextUrl

  const isPublicPath =
    pathname === '/maintenance' ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml' ||
    PUBLIC_FILE.test(pathname)

  if (isPublicPath) {
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

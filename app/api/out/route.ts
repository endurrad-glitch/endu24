import { NextResponse } from 'next/server'

export async function GET(request: Request) {
  const url = new URL(request.url)
  const to = url.searchParams.get('to')

  if (!to) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  try {
    const outbound = new URL(to)
    return NextResponse.redirect(outbound)
  } catch {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

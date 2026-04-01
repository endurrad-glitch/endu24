export function buildOutboundUrl(url: string | null | undefined, slug: string, placement: string) {
  if (!url) return null
  const redirect = new URL('/api/out', process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000')
  redirect.searchParams.set('to', url)
  redirect.searchParams.set('slug', slug)
  redirect.searchParams.set('placement', placement)
  return `${redirect.pathname}${redirect.search}`
}

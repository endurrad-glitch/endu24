import { NextResponse } from 'next/server'
import { getSearchSuggestions } from '@/lib/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') || ''
  const data = await getSearchSuggestions(q, 8)
  return NextResponse.json(data)
}

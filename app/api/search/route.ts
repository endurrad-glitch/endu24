import { NextResponse } from 'next/server'
import { getProducts } from '@/lib/products'

function fuzzyScore(text: string, query: string) {
  if (!query) return 0
  const t = text.toLowerCase()
  const q = query.toLowerCase()
  if (t.startsWith(q)) return 120
  if (t.includes(q)) return 90

  let qi = 0
  for (let i = 0; i < t.length && qi < q.length; i += 1) {
    if (t[i] === q[qi]) qi += 1
  }

  return qi === q.length ? 60 : 0
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = (searchParams.get('q') ?? '').trim().toLowerCase()

  if (!q) return NextResponse.json([])

  const products = await getProducts()
  const ranked = products
    .map((product) => {
      const text = `${product.name} ${product.brand} ${product.type} ${product.category}`
      const score = fuzzyScore(text, q)
      return { product, score }
    })
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map(({ product }) => ({
      slug: product.slug,
      name: product.name,
      image: product.image,
      bestPrice: product.offers[0]?.price ?? product.basePrice,
      rating: product.rating,
      ratingCount: product.ratingCount,
      shopCount: product.offers.length,
    }))

  return NextResponse.json(ranked)
}

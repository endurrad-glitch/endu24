import { NextResponse } from 'next/server'
import { searchCatalog } from '@/lib/products'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q') ?? ''
  const results = searchCatalog(q)

  return NextResponse.json({
    products: results.products.map((product) => ({
      slug: product.slug,
      title: product.title,
      price: product.price,
    })),
    categories: results.categories.map((category) => ({
      slug: category.slug,
      name: category.name,
    })),
  })
}

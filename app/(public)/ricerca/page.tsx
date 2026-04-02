import Link from 'next/link'
import type { Metadata } from 'next'
import { FiltersSidebar } from '@/components/layout/filters-sidebar'
import { ProductCard } from '@/components/layout/product-card'
import { queryProducts } from '@/lib/products'

export const metadata: Metadata = {
  title: 'Risultati ricerca | endu24',
  description: 'Confronta prezzi e trova il miglior prodotto per te su endu24.',
}

export default async function SearchResultsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
  const params = await searchParams
  const q = typeof params.q === 'string' ? params.q : ''
  const sort = typeof params.sort === 'string' ? params.sort : 'popularity'
  const page = Number.parseInt(typeof params.page === 'string' ? params.page : '1', 10)

  const { products, totalPages, currentPage, total } = queryProducts({
    query: q,
    sort: sort as 'price_asc' | 'price_desc' | 'popularity',
    page,
  })

  return (
    <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
      <FiltersSidebar />
      <section>
        <h1 className="text-2xl font-semibold">Risultati per “{q || 'tutto il catalogo'}”</h1>
        <p className="mt-1 text-sm text-[#2b2b2b]/70">{total} prodotti trovati</p>

        <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>

        <div className="mt-8 flex items-center gap-3">
          {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((n) => (
            <Link
              key={n}
              href={`/ricerca?q=${encodeURIComponent(q)}&sort=${sort}&page=${n}`}
              className={`rounded-full px-3 py-1 text-sm ${n === currentPage ? 'bg-[#ff580d] text-white' : 'bg-white ring-1 ring-[#2b2b2b]/10 text-[#2b2b2b]'}`}
            >
              {n}
            </Link>
          ))}
        </div>
      </section>
    </div>
  )
}

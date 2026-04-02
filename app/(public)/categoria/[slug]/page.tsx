import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { FiltersSidebar } from '@/components/layout/filters-sidebar'
import { ProductCard } from '@/components/layout/product-card'
import { getAllCategories, queryProducts } from '@/lib/products'

type Props = {
  params: Promise<{ slug: string }>
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const category = getAllCategories().find((item) => item.slug === slug)

  if (!category) {
    return { title: 'Categoria non trovata | endu24' }
  }

  return {
    title: `${category.name} | endu24`,
    description: `Confronta prezzi e offerte nella categoria ${category.name}.`,
  }
}

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params
  const query = await searchParams
  const category = getAllCategories().find((item) => item.slug === slug)

  if (!category) {
    notFound()
  }

  const sort = typeof query.sort === 'string' ? query.sort : 'popularity'
  const page = Number.parseInt(typeof query.page === 'string' ? query.page : '1', 10)

  const { products, total, totalPages, currentPage } = queryProducts({
    categorySlug: slug,
    sort: sort as 'price_asc' | 'price_desc' | 'popularity',
    page,
  })

  return (
    <div className="space-y-6">
      <nav className="text-sm text-[#2b2b2b]/70">
        <Link href="/">Home</Link> / <span>{category.name}</span>
      </nav>

      <header>
        <h1 className="text-3xl font-bold">{category.name}</h1>
        <p className="mt-2 max-w-3xl text-[#2b2b2b]/70">
          Esplora il catalogo {category.name} con confronti prezzo aggiornati, disponibilità e recensioni reali.
        </p>
      </header>

      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        <FiltersSidebar />
        <section>
          <p className="text-sm text-[#2b2b2b]/70">{total} prodotti in categoria</p>
          <div className="mt-4 grid grid-cols-2 gap-4 lg:grid-cols-4">
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
          <div className="mt-8 flex gap-3">
            {Array.from({ length: totalPages }, (_, idx) => idx + 1).map((n) => (
              <Link
                key={n}
                href={`/categoria/${slug}?sort=${sort}&page=${n}`}
                className={`rounded-full px-3 py-1 text-sm ${n === currentPage ? 'bg-[#ff580d] text-white' : 'bg-white ring-1 ring-[#2b2b2b]/10'}`}
              >
                {n}
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

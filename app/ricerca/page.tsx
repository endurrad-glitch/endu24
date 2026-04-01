import { Breadcrumb } from '@/components/plp/Breadcrumb'
import { FilterSidebar } from '@/components/plp/FilterSidebar'
import { ProductCard } from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams
  const q = (params.q || '').toLowerCase()
  const brand = params.brand
  const categoria = params.categoria

  const products = await getProducts()
  const filtered = products.filter((product) => {
    const matchQuery = !q || `${product.title} ${product.brand} ${product.category}`.toLowerCase().includes(q)
    const matchBrand = !brand || product.brand === brand
    const matchCategory = !categoria || product.category === categoria
    return matchQuery && matchBrand && matchCategory
  })

  const brands = Array.from(new Set(products.map((p) => p.brand))).slice(0, 12)
  const categories = Array.from(new Set(products.map((p) => p.category))).slice(0, 12)

  return (
    <main className="container page-stack">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Ricerca' }]} />
      <section>
        <h1>Risultati ricerca {q ? `per "${q}"` : ''}</h1>
        <p>{filtered.length} risultati disponibili.</p>
      </section>
      <div className="plp-layout">
        <FilterSidebar brands={brands} categories={categories} />
        <div className="products-grid">
          {filtered.map((product) => <ProductCard key={product.slug} product={product} />)}
        </div>
      </div>
    </main>
  )
}

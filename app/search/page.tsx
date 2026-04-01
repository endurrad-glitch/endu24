import Breadcrumb from '@/components/Breadcrumb'
import FilterSidebar from '@/components/FilterSidebar'
import ProductCard from '@/components/ProductCard'
import SearchBar from '@/components/SearchBar'
import { getProducts } from '@/lib/products'

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const params = await searchParams
  const query = (params.q ?? '').toLowerCase()
  const brand = (params.brand ?? '').toLowerCase()
  const category = params.category ?? ''
  const min = Number(params.min ?? 0)
  const max = Number(params.max ?? 999999)
  const rating = Number(params.rating ?? 0)

  const products = await getProducts()
  const filtered = products.filter((product) => {
    const best = product.offers[0]?.price ?? product.basePrice
    const byQuery = !query || product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
    const byBrand = !brand || product.brand.toLowerCase().includes(brand)
    const byCategory = !category || product.type === category
    const byPrice = best >= min && best <= max
    const byRating = product.rating >= rating
    return byQuery && byBrand && byCategory && byPrice && byRating
  })

  return (
    <main className="plp-page container">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Ricerca' }]} />
      <header className="plp-header">
        <h1>Risultati per {params.q ? `“${params.q}”` : 'tutti i prodotti'}</h1>
        <p>{filtered.length} risultati trovati</p>
        <SearchBar initialQuery={params.q ?? ''} />
      </header>

      <section className="plp-layout">
        <FilterSidebar currentQuery={params.q} currentBrand={params.brand} currentCategory={params.category} />
        <div className="plp-grid">
          {filtered.map((product) => (<ProductCard key={product.slug} product={product} />))}
        </div>
      </section>
    </main>
  )
}

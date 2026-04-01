import { Breadcrumb } from '@/components/plp/Breadcrumb'
import { ProductResultsExplorer } from '@/components/plp/ProductResultsExplorer'
import { getProducts } from '@/lib/products'

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams
  const q = (params.q || '').toLowerCase()

  const products = await getProducts()
  const filtered = products.filter((product) => !q || `${product.title} ${product.brand} ${product.category}`.toLowerCase().includes(q))

  return (
    <main className="container page-stack">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Ricerca' }]} />
      <section>
        <h1>Risultati ricerca {q ? `per "${q}"` : ''}</h1>
        <p>{filtered.length} risultati disponibili.</p>
      </section>
      <ProductResultsExplorer products={filtered} />
    </main>
  )
}

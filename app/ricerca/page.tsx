import { Breadcrumb } from '@/components/plp/Breadcrumb'
import { ProductResultsExplorer } from '@/components/plp/ProductResultsExplorer'
import { ResultsHeader } from '@/components/plp/ResultsHeader'
import { getProducts } from '@/lib/products'

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams
  const q = (params.q || '').toLowerCase()

  const products = await getProducts()
  const filtered = products.filter((product) => !q || `${product.title} ${product.brand} ${product.category}`.toLowerCase().includes(q))
  const titleContext = q || 'tutte le categorie'

  return (
    <main className="container page-stack">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Ricerca' }]} />
      <ResultsHeader titleContext={titleContext} total={filtered.length} />
      <ProductResultsExplorer products={filtered} />
    </main>
  )
}

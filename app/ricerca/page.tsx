import { Breadcrumb } from '@/components/plp/Breadcrumb'
import { ProductResultsExplorer } from '@/components/plp/ProductResultsExplorer'
import { ResultsHeader } from '@/components/plp/ResultsHeader'
import { getProducts } from '@/lib/products'

function normalize(value?: string) {
  return decodeURIComponent(value || '').trim().toLowerCase()
}

function includesNormalized(haystack: string, needle: string) {
  return haystack.toLowerCase().includes(needle)
}

export default async function SearchPage({ searchParams }: { searchParams: Promise<Record<string, string>> }) {
  const params = await searchParams
  const rawQuery = decodeURIComponent(params.q || '').trim()
  const q = normalize(params.q)
  const category = decodeURIComponent(params.categoria || params.category || '').trim()
  const subcategory = decodeURIComponent(params.sottocategoria || params.subcategory || '').trim()

  const products = await getProducts()

  const filtered = products.filter((product) => {
    const searchHaystack = `${product.title} ${product.brand} ${product.category} ${product.sourceCategory || ''}`.toLowerCase()
    const matchesQuery = !q || includesNormalized(searchHaystack, q)
    const matchesCategory = !category || product.category.toLowerCase() === category.toLowerCase()
    const matchesSubcategory = !subcategory || (product.sourceCategory || '').toLowerCase() === subcategory.toLowerCase()
    return matchesQuery && matchesCategory && matchesSubcategory
  })

  const titleContext = rawQuery || category || 'ricerca prodotti'

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-4 md:px-6 md:py-6">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: titleContext }]} />
      <ResultsHeader titleContext={titleContext} total={filtered.length} />
      <ProductResultsExplorer products={filtered} />
    </main>
  )
}

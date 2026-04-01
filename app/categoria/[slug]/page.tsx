import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/plp/Breadcrumb'
import { ProductResultsExplorer } from '@/components/plp/ProductResultsExplorer'
import { ResultsHeader } from '@/components/plp/ResultsHeader'
import { buildCategoryTree, filterProductsByCategorySlug, getCategoryBySlug, getFlatCategories } from '@/lib/catalog'
import { getProducts } from '@/lib/products'

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [products, flatCategories] = await Promise.all([getProducts(), getFlatCategories()])
  const categoryTree = buildCategoryTree(flatCategories)
  const currentCategory = getCategoryBySlug(slug, flatCategories)

  if (!currentCategory) {
    notFound()
  }

  const filteredProducts = filterProductsByCategorySlug(products, slug, flatCategories, categoryTree)

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-4 md:px-6 md:py-6">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: currentCategory.name }]} />
      <ResultsHeader titleContext={currentCategory.name} total={filteredProducts.length} />
      <ProductResultsExplorer products={filteredProducts} />
    </main>
  )
}

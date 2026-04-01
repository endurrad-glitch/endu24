import { HomepageHero } from '@/components/home/HomepageHero'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { ProductGrid } from '@/components/home/ProductGrid'
import { DealsCarousel } from '@/components/home/DealsCarousel'
import { TrustSection } from '@/components/home/TrustSection'
import { buildCategoryTree, filterProductsByCategorySlug, getFlatCategories } from '@/lib/catalog'
import { getProducts } from '@/lib/products'

export default async function HomePage() {
  const [products, flatCategories] = await Promise.all([getProducts(), getFlatCategories()])
  const categoryTree = buildCategoryTree(flatCategories)
  const rootCategories = categoryTree.filter((category) => category.level === 0)
  const categories = rootCategories.slice(0, 4)

  const trending = [...products]
    .sort((a, b) => {
      const aPrice = a.offers[0]?.price ?? a.price
      const bPrice = b.offers[0]?.price ?? b.price
      const aScore = (a.rating * 40) + (a.reviews * 0.15) + (a.offers.length * 12) - (aPrice * 0.02)
      const bScore = (b.rating * 40) + (b.reviews * 0.15) + (b.offers.length * 12) - (bPrice * 0.02)
      return bScore - aScore
    })
    .slice(0, 8)

  const featuredDeals = [...products]
    .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
    .slice(0, 8)

  const popularFromCategories = rootCategories
    .flatMap((category) => filterProductsByCategorySlug(products, category.slug, flatCategories, categoryTree).slice(0, 1))
    .slice(0, 6)

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-4 px-4 py-4">
      <HomepageHero />
      <section id="categorie">
        <CategoryGrid categories={categories} />
      </section>
      <ProductGrid products={trending} />
      <DealsCarousel products={featuredDeals.length ? featuredDeals : popularFromCategories} />
      <TrustSection products={products.length} shops={12} />
    </main>
  )
}

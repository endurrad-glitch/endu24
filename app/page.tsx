import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { OffersSlider } from '@/components/home/OffersSlider'
import { TrustSection } from '@/components/home/TrustSection'
import { ProductCard } from '@/components/ProductCard'
import { buildCategoryTree, getFlatCategories } from '@/lib/catalog'
import { getProducts } from '@/lib/products'

export default async function HomePage() {
  const [products, flatCategories] = await Promise.all([getProducts(), getFlatCategories()])
  const categories = buildCategoryTree(flatCategories).filter((category) => category.level === 0).slice(0, 6)

  const trending = [...products]
    .sort((a, b) => {
      const aPrice = a.offers[0]?.price ?? a.price
      const bPrice = b.offers[0]?.price ?? b.price
      const aScore = (a.rating * 40) + (a.reviews * 0.15) + (a.offers.length * 12) - (aPrice * 0.02)
      const bScore = (b.rating * 40) + (b.reviews * 0.15) + (b.offers.length * 12) - (bPrice * 0.02)
      return bScore - aScore
    })
    .slice(0, 10)

  const featuredDeals = [...products]
    .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
    .slice(0, 6)

  return (
    <main className="container page-stack">
      <HeroSection imageUrl={trending[0]?.image} />
      <CategoryGrid categories={categories} />
      <section>
        <h2>Prodotti trend</h2>
        <div className="products-grid products-grid-trending">{trending.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
      </section>
      <OffersSlider products={featuredDeals.length ? featuredDeals : trending.slice(0, 4)} />
      <TrustSection products={products.length} shops={12} />
    </main>
  )
}

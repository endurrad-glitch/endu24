import { HeroSection } from '@/components/home/HeroSection'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { OffersSlider } from '@/components/home/OffersSlider'
import { TrustSection } from '@/components/home/TrustSection'
import { ProductCard } from '@/components/ProductCard'
import { getProducts } from '@/lib/products'

export default async function HomePage() {
  const products = await getProducts()
  const categories = Array.from(new Set(products.map((p) => p.category))).slice(0, 6)
  const trending = [...products].sort((a, b) => a.offers[0].price - b.offers[0].price).slice(0, 8)
  const featuredDeals = [...products]
    .filter((p) => p.compareAtPrice && p.compareAtPrice > p.price)
    .slice(0, 6)

  return (
    <main className="container page-stack">
      <HeroSection />
      <CategoryGrid categories={categories} />
      <section>
        <h2>Prodotti trend</h2>
        <div className="products-grid">{trending.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
      </section>
      <OffersSlider products={featuredDeals.length ? featuredDeals : trending.slice(0, 4)} />
      <TrustSection products={products.length} shops={12} />
    </main>
  )
}

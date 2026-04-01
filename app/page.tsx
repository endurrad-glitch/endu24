import HeroSection from '@/components/HeroSection'
import ProductCard from '@/components/ProductCard'
import CategoryGrid from '@/components/CategoryGrid'
import OffersSlider from '@/components/OffersSlider'
import TrustSection from '@/components/TrustSection'
import { getCategories, getProducts } from '@/lib/products'

export default async function Home() {
  const products = await getProducts()
  const categories = await getCategories()
  const trend = products.slice(0, 8)
  const deals = products.slice(8, 14)
  const shops = new Set(products.flatMap((product) => product.offers.map((offer) => offer.shop)))

  return (
    <main className="compare-home">
      <HeroSection />

      <section className="section-block">
        <div className="container">
          <div className="section-head"><h2>Categorie principali</h2></div>
          <CategoryGrid categories={categories.slice(0, 6)} />
        </div>
      </section>

      <section className="section-block">
        <div className="container">
          <div className="section-head"><h2>Prodotti trend</h2></div>
          <div className="products-grid">
            {trend.map((product) => (<ProductCard key={product.slug} product={product} />))}
          </div>
        </div>
      </section>

      <OffersSlider products={deals} />
      <TrustSection products={products.length} shops={shops.size} />
    </main>
  )
}

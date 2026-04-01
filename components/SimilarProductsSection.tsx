import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/products'

export default function SimilarProductsSection({ products }: { products: Product[] }) {
  if (products.length === 0) return null

  return (
    <section className="section-block">
      <h2>Prodotti simili</h2>
      <div className="products-grid">
        {products.map((item) => (<ProductCard key={item.slug} product={item} />))}
      </div>
    </section>
  )
}

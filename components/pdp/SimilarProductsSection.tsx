import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/lib/products'

export function SimilarProductsSection({ products }: { products: Product[] }) {
  if (!products.length) return null
  return (
    <section>
      <h2>Prodotti simili</h2>
      <div className="products-grid">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  )
}

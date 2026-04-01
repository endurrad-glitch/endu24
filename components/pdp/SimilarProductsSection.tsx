import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/lib/products'

export function SimilarProductsSection({ products }: { products: Product[] }) {
  if (!products.length) return null
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold tracking-tight">Prodotti simili</h2>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 xl:grid-cols-4">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  )
}

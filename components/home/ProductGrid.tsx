import type { Product } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'

export function ProductGrid({ products }: { products: Product[] }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-lg font-semibold text-[#2b2b2b]">Prodotti più cercati</h2>
      <div className="grid grid-cols-2 gap-4">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  )
}

import type { Product } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'

export function DealsCarousel({ products }: { products: Product[] }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-lg font-semibold text-[#2b2b2b]">Offerte in evidenza</h2>
      <div className="grid auto-cols-[minmax(170px,76vw)] grid-flow-col gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <div key={product.slug}>
            <ProductCard product={product} showDiscountBadge />
          </div>
        ))}
      </div>
    </section>
  )
}

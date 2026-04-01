import type { Product } from '@/lib/products'
import { ProductCard } from '@/components/ProductCard'

export function DealsCarousel({ products }: { products: Product[] }) {
  return (
    <section className="grid gap-3">
      <h2 className="text-lg font-semibold text-[#2b2b2b]">Offerte in evidenza</h2>
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-2">
        {products.map((product) => (
          <div key={product.slug} className="min-w-[250px] snap-start">
            <ProductCard product={product} showDiscountBadge />
          </div>
        ))}
      </div>
    </section>
  )
}

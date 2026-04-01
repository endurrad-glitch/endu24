import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/lib/products'

export function OffersSlider({ products }: { products: Product[] }) {
  return (
    <section>
      <h2 className="mb-3 text-xl font-semibold tracking-tight">Offerte in evidenza</h2>
      <div className="grid auto-cols-[minmax(180px,72vw)] grid-flow-col gap-3 overflow-x-auto pb-2 md:grid-flow-row md:grid-cols-3 lg:grid-cols-4 md:auto-cols-auto">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  )
}

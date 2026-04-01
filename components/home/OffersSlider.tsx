import { ProductCard } from '@/components/ProductCard'
import type { Product } from '@/lib/products'

export function OffersSlider({ products }: { products: Product[] }) {
  return (
    <section>
      <h2>Offerte in evidenza</h2>
      <div className="offers-slider">
        {products.map((product) => <ProductCard key={product.slug} product={product} />)}
      </div>
    </section>
  )
}

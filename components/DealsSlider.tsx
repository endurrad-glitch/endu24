import Link from 'next/link'
import type { Product } from '@/lib/products'

export default function DealsSlider({ products }: { products: Product[] }) {
  return (
    <div className="deals-slider" aria-label="Offerte del giorno" role="region">
      {products.map((product) => {
        const best = product.offers[0]?.price ?? product.basePrice
        const discount = product.compareAtPrice && product.compareAtPrice > best
          ? Math.round(((product.compareAtPrice - best) / product.compareAtPrice) * 100)
          : 15

        return (
          <article className="deal-card" key={product.slug}>
            <img src={product.image} alt={product.name} loading="lazy" />
            <p className="deal-name">{product.name}</p>
            <p className="deal-prices"><span className="deal-now">€{best.toFixed(2)}</span></p>
            <p className="deal-discount">-{discount}%</p>
            <Link href={`/prodotto/${product.slug}`} className="deal-link">Confronta</Link>
          </article>
        )
      })}
    </div>
  )
}

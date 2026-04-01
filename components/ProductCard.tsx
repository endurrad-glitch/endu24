import Link from 'next/link'
import type { Product } from '@/lib/products'

export default function ProductCard({ product }: { product: Product }) {
  const best = product.offers[0]?.price ?? product.basePrice
  const avg = product.offers.length
    ? product.offers.reduce((sum, offer) => sum + offer.price, 0) / product.offers.length
    : best

  return (
    <article className="compare-card" itemScope itemType="https://schema.org/Product">
      <Link href={`/prodotto/${product.slug}`} className="card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" className="card-image" itemProp="image" />
        <span className="price-badge badge-best">Miglior prezzo</span>
      </Link>

      <div className="card-body">
        <h3 className="card-title" itemProp="name">{product.name}</h3>

        <p className="price-line" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span className="lowest-price">€{best.toFixed(2)}</span>
          <meta itemProp="price" content={best.toFixed(2)} />
          <meta itemProp="priceCurrency" content="EUR" />
        </p>

        <p className="small-meta">Prezzo medio: €{avg.toFixed(2)}</p>
        <p className="small-meta">da {product.offers.length} negozi</p>
        <p className="rating-row"><span className="stars">{'★'.repeat(Math.round(product.rating))}</span> ({product.ratingCount})</p>

        <Link href={`/prodotto/${product.slug}`} className="compare-btn">Vedi offerta</Link>
      </div>
    </article>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { buildOutboundUrl } from '@/lib/tracking'

export function ProductCard({ product }: { product: Product }) {
  const outboundUrl = buildOutboundUrl(product.offers[0]?.url || product.externalUrl, product.slug, 'card')

  return (
    <article className="product-card">
      <Link href={`/prodotto/${product.slug}`} className="product-card-image-link" aria-label={`Apri ${product.title}`}>
        <Image src={product.image} alt={product.title} width={320} height={320} loading="lazy" />
      </Link>

      <Link href={`/prodotto/${product.slug}`} className="product-card-title-link">
        <h3>{product.title}</h3>
      </Link>

      <p className="price">{formatPrice(product.offers[0]?.price ?? product.price)}</p>
      <p className="meta">★ {product.rating.toFixed(1)} · {product.reviews} recensioni</p>

      <div className="product-card-actions">
        {outboundUrl
          ? <a href={outboundUrl} className="primary-btn" target="_blank" rel="noopener noreferrer sponsored">Vedi offerta</a>
          : <span className="secondary-btn" aria-disabled>Link non disponibile</span>}
        <Link href={`/prodotto/${product.slug}`} className="secondary-btn">Confronta</Link>
      </div>
    </article>
  )
}

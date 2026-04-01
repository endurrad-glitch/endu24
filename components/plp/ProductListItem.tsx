import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/format'
import { buildOutboundUrl } from '@/lib/tracking'
import type { Product } from '@/lib/products'

export function ProductListItem({ product }: { product: Product }) {
  const outboundUrl = buildOutboundUrl(product.offers[0]?.url || product.externalUrl, product.slug, 'list')

  return (
    <article className="product-list-item">
      <Link href={`/prodotto/${product.slug}`} className="product-list-image">
        <Image src={product.image} alt={product.title} width={220} height={180} loading="lazy" />
      </Link>
      <div className="product-list-content">
        <Link href={`/prodotto/${product.slug}`} className="product-list-title">{product.title}</Link>
        <p className="price">{formatPrice(product.offers[0]?.price ?? product.price)}</p>
        <p className="meta">★ {product.rating.toFixed(1)} · {product.reviews} recensioni · {product.offers.length} negozi</p>
        <p className="product-list-description">{product.shortDescription || product.description}</p>
        <div className="product-list-actions">
          <Link href={`/prodotto/${product.slug}`} className="secondary-btn">Dettagli</Link>
          {outboundUrl
            ? <a href={outboundUrl} className="primary-btn" target="_blank" rel="noopener noreferrer sponsored">Vedi offerta</a>
            : <span className="secondary-btn" aria-disabled>Link non disponibile</span>}
        </div>
      </div>
    </article>
  )
}

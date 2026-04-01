import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/format'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Image src={product.image} alt={product.title} width={320} height={280} loading="lazy" />
      <h3>{product.title}</h3>
      <p className="price">{formatPrice(product.offers[0]?.price ?? product.price)}</p>
      <p className="meta">da {product.offers.length} negozi · ★ {product.rating}</p>
      <Link href={`/prodotto/${product.slug}`} className="secondary-btn">Confronta</Link>
    </article>
  )
}

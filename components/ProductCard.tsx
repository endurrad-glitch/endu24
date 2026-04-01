import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { buildOutboundUrl } from '@/lib/tracking'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function ProductCard({ product, showDiscountBadge = false }: { product: Product; showDiscountBadge?: boolean }) {
  const outboundUrl = buildOutboundUrl(product.offers[0]?.url || product.externalUrl, product.slug, 'card')
  const activePrice = product.offers[0]?.price ?? product.price
  const hasDiscount = Boolean(product.compareAtPrice && product.compareAtPrice > activePrice)
  const discount = hasDiscount ? Math.round(((product.compareAtPrice! - activePrice) / product.compareAtPrice!) * 100) : 0

  return (
    <Card className="relative grid gap-2 rounded-2xl border-slate-200 bg-white p-3">
      {showDiscountBadge && hasDiscount && (
        <span className="absolute left-2 top-2 z-10 rounded-full bg-[#ff5a00] px-2 py-1 text-[10px] font-bold text-white">
          -{discount}%
        </span>
      )}

      <Link href={`/prodotto/${product.slug}`} aria-label={`Apri ${product.title}`} className="rounded-xl bg-slate-50 p-2">
        <Image src={product.image} alt={product.title} width={320} height={320} loading="lazy" className="aspect-square w-full object-contain" />
      </Link>

      <Link href={`/prodotto/${product.slug}`} className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-[#2b2b2b]">
        {product.title}
      </Link>

      <p className="text-base font-bold text-[#ff5a00]">{formatPrice(activePrice)}</p>
      <p className="text-xs text-slate-500">★ {product.rating.toFixed(1)} · {product.reviews}</p>

      <div className="grid gap-2">
        {outboundUrl
          ? <a href={outboundUrl} target="_blank" rel="noopener noreferrer sponsored"><Button className="h-11 w-full rounded-xl">Vedi offerta</Button></a>
          : <Button variant="outline" className="h-11 w-full rounded-xl" disabled>Link non disponibile</Button>}
        <Link href={`/prodotto/${product.slug}`}><Button variant="outline" className="h-11 w-full rounded-xl">Confronta</Button></Link>
      </div>
    </Card>
  )
}

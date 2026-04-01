import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { buildOutboundUrl } from '@/lib/tracking'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

export function ProductCard({ product }: { product: Product }) {
  const outboundUrl = buildOutboundUrl(product.offers[0]?.url || product.externalUrl, product.slug, 'card')

  return (
    <Card className="grid gap-2 p-2 sm:p-3">
      <Link href={`/prodotto/${product.slug}`} aria-label={`Apri ${product.title}`}>
        <Image src={product.image} alt={product.title} width={320} height={320} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
      </Link>

      <Link href={`/prodotto/${product.slug}`} className="line-clamp-2 min-h-10 text-sm font-semibold leading-5 text-slate-800">
        {product.title}
      </Link>

      <p className="text-lg font-bold text-[#ff5a00]">{formatPrice(product.offers[0]?.price ?? product.price)}</p>
      <p className="text-xs text-slate-500">★ {product.rating.toFixed(1)} · {product.reviews} recensioni</p>

      <div className="grid gap-2">
        {outboundUrl
          ? <a href={outboundUrl} target="_blank" rel="noopener noreferrer sponsored"><Button className="w-full">Vedi offerta</Button></a>
          : <Button variant="outline" className="w-full" disabled>Link non disponibile</Button>}
        <Link href={`/prodotto/${product.slug}`}><Button variant="outline" className="w-full">Confronta</Button></Link>
      </div>
    </Card>
  )
}

import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/format'
import { buildOutboundUrl } from '@/lib/tracking'
import type { Product } from '@/lib/products'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function ProductListItem({ product }: { product: Product }) {
  const outboundUrl = buildOutboundUrl(product.offers[0]?.url || product.externalUrl, product.slug, 'list')

  return (
    <Card className="grid gap-3 p-3 md:grid-cols-[150px_minmax(0,1fr)]">
      <Link href={`/prodotto/${product.slug}`}>
        <Image src={product.image} alt={product.title} width={220} height={180} loading="lazy" className="aspect-square w-full rounded-xl object-cover" />
      </Link>
      <div className="grid gap-2">
        <Link href={`/prodotto/${product.slug}`} className="text-sm font-semibold text-slate-800 md:text-base">{product.title}</Link>
        <p className="text-lg font-bold text-[#ff5a00]">{formatPrice(product.offers[0]?.price ?? product.price)}</p>
        <p className="text-xs text-slate-500">★ {product.rating.toFixed(1)} · {product.reviews} recensioni · {product.offers.length} negozi</p>
        <p className="line-clamp-2 text-sm text-slate-600">{product.shortDescription || product.description}</p>
        <div className="grid grid-cols-2 gap-2">
          <Link href={`/prodotto/${product.slug}`}><Button variant="outline" className="w-full">Confronta</Button></Link>
          {outboundUrl ? <a href={outboundUrl} target="_blank" rel="noopener noreferrer sponsored"><Button className="w-full">Vedi offerta</Button></a> : <Button variant="outline" className="w-full" disabled>Link non disponibile</Button>}
        </div>
      </div>
    </Card>
  )
}

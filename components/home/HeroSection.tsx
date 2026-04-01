import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

type HeroHighlight = {
  slot: string
  categoryName: string
  categorySlug: string
  product: Product
}

export function HeroSection({ highlights }: { highlights: HeroHighlight[] }) {
  return (
    <section className="grid gap-4 rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 to-white p-4 md:grid-cols-[minmax(0,1fr)_minmax(300px,440px)] md:p-6">
      <div className="grid gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Comparatore prezzi premium</p>
        <h1 className="text-3xl font-bold leading-tight tracking-tight md:text-5xl">Trova il miglior prezzo, senza perdere tempo</h1>
        <p className="text-sm text-slate-600 md:text-base">Confronta prodotti, categorie e offerte dai migliori store in modo semplice e veloce.</p>
        <div className="flex flex-wrap gap-2">
          <Link href="/ricerca"><Button>Confronta ora</Button></Link>
          <Link href="#categorie"><Button variant="outline">Esplora categorie</Button></Link>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {highlights.map((item) => {
          const price = item.product.offers[0]?.price ?? item.product.price
          return (
            <Link key={`${item.slot}-${item.product.slug}`} href={`/categoria/${item.categorySlug}`}>
              <Card className="grid gap-2 p-2">
                <span className="text-[11px] font-semibold uppercase text-slate-500">{item.categoryName}</span>
                <Image src={item.product.image || '/file.svg'} alt={item.product.title} width={220} height={220} className="aspect-square w-full rounded-lg object-cover" />
                <p className="line-clamp-2 text-xs font-medium text-slate-700">{item.product.title}</p>
                <p className="text-sm font-bold text-[#ff5a00]">da €{price.toFixed(2)}</p>
              </Card>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

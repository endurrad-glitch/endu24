import Link from 'next/link'
import Image from 'next/image'
import type { CatalogProduct } from '@/types/catalog'

export function HeroSection({ product }: { product: CatalogProduct }) {
  return (
    <section className="grid items-center gap-8 rounded-3xl bg-gradient-to-r from-[#2b2b2b] to-[#ff580d] px-8 py-10 text-white lg:grid-cols-2">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-white/80">Offerte intelligenti</p>
        <h1 className="mt-3 text-3xl font-bold lg:text-5xl">Confronta i migliori prezzi per la tua moto</h1>
        <p className="mt-4 max-w-xl text-white/90">
          Dalla tecnologia ai viaggi adventure: trova offerte verificate, comparale al volo e acquista dal negozio migliore.
        </p>
        <Link href={`/prodotto/${product.slug}`} className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[#2b2b2b]">
          Scopri ora
        </Link>
      </div>
      <div className="relative h-64 overflow-hidden rounded-2xl bg-[#2b2b2b]/10 lg:h-80">
        <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" priority />
      </div>
    </section>
  )
}

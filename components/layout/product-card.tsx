import Image from 'next/image'
import Link from 'next/link'
import type { CatalogProduct } from '@/types/catalog'

export function ProductCard({ product }: { product: CatalogProduct }) {
  return (
    <article className="rounded-2xl border border-[#2b2b2b]/10 bg-white p-4 shadow-sm">
      <Link href={`/prodotto/${product.slug}`} className="block">
        <div className="relative h-44 overflow-hidden rounded-xl bg-white">
          <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(max-width:768px) 50vw, 20vw" />
        </div>
        <p className="mt-3 text-xs uppercase text-[#2b2b2b]/70">{product.brand}</p>
        <h3 className="line-clamp-2 text-sm font-semibold text-[#2b2b2b]">{product.title}</h3>
      </Link>
      <div className="mt-3 flex items-baseline justify-between">
        <span className="text-lg font-bold">€{product.price.toFixed(2)}</span>
        <span className="text-xs text-[#2b2b2b]/70">{product.reviews} recensioni</span>
      </div>
    </article>
  )
}

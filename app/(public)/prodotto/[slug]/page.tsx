import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ProductCarousel } from '@/components/layout/product-carousel'
import { getProductBySlug, getRelatedProducts } from '@/lib/products'

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const product = getProductBySlug(slug)
  if (!product) return { title: 'Prodotto non trovato | endu24' }

  return {
    title: `${product.title} | endu24`,
    description: product.shortDescription,
  }
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params
  const product = getProductBySlug(slug)

  if (!product) {
    notFound()
  }

  const related = getRelatedProducts(product.categorySlug, product.slug, 10)

  return (
    <div className="space-y-10">
      <nav className="text-sm text-slate-600">
        <Link href="/">Home</Link> / <Link href={`/categoria/${product.categorySlug}`}>{product.category}</Link> / <span>{product.title}</span>
      </nav>

      <section className="grid gap-8 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="relative h-[420px] overflow-hidden rounded-2xl bg-white">
            <Image src={product.image} alt={product.title} fill className="object-cover" />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image) => (
              <div key={image} className="relative h-24 overflow-hidden rounded-lg bg-white">
                <Image src={image} alt={product.title} fill className="object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <h1 className="text-3xl font-bold">{product.title}</h1>
          <p className="mt-2 text-slate-600">{product.shortDescription}</p>
          <p className="mt-4 text-3xl font-bold">€{product.price.toFixed(2)}</p>

          <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5">
            <h2 className="font-semibold">Confronta offerte</h2>
            <ul className="mt-3 space-y-3">
              {product.offers.map((offer) => (
                <li key={`${offer.shop}-${offer.price}`} className="flex items-center justify-between rounded-xl border border-slate-100 p-3">
                  <div>
                    <p className="font-medium">{offer.shop}</p>
                    <p className="text-xs text-slate-500">Spedizione {offer.shipping}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">€{offer.price.toFixed(2)}</p>
                    <a href={offer.url ?? '#'} className="text-sm text-blue-600 hover:underline" target="_blank" rel="noreferrer">
                      Vai al negozio
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Descrizione</h2>
        <div className="prose mt-3 max-w-none text-slate-700" dangerouslySetInnerHTML={{ __html: product.description }} />
      </section>

      <section className="rounded-2xl border border-slate-200 bg-white p-6">
        <h2 className="text-xl font-semibold">Specifiche tecniche</h2>
        <dl className="mt-3 grid gap-3 text-sm text-slate-700 sm:grid-cols-2">
          <div>
            <dt className="text-slate-500">Brand</dt>
            <dd>{product.brand}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Categoria</dt>
            <dd>{product.category}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Disponibilità</dt>
            <dd>{product.availability}</dd>
          </div>
          <div>
            <dt className="text-slate-500">Recensioni</dt>
            <dd>{product.reviews}</dd>
          </div>
        </dl>
      </section>

      <ProductCarousel title="Prodotti correlati" products={related} />
    </div>
  )
}

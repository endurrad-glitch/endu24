import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Breadcrumb } from '@/components/plp/Breadcrumb'
import { ProductGallery } from '@/components/pdp/ProductGallery'
import { PriceComparisonTable } from '@/components/pdp/PriceComparisonTable'
import { ProductSpecsTable } from '@/components/pdp/ProductSpecsTable'
import { SimilarProductsSection } from '@/components/pdp/SimilarProductsSection'
import { getProductBySlug, getProducts } from '@/lib/products'
import { formatPrice } from '@/lib/format'
import { buildOutboundUrl } from '@/lib/tracking'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) return { title: 'Prodotto non trovato | ENDU24' }
  return {
    title: `${product.title} | ENDU24 comparatore`,
    description: product.shortDescription || `Confronta prezzi per ${product.title} su ENDU24`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)
  if (!product) notFound()

  const allProducts = await getProducts()
  const similar = allProducts
    .filter((item) => item.slug !== product.slug && (item.category === product.category || item.brand === product.brand))
    .slice(0, 4)

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    brand: product.brand,
    image: product.images,
    description: product.shortDescription,
    offers: product.offers.map((offer) => ({ '@type': 'Offer', priceCurrency: 'EUR', price: offer.price, seller: { '@type': 'Organization', name: offer.shop } })),
  }

  const mainOfferUrl = buildOutboundUrl(product.offers[0]?.url || product.externalUrl, product.slug, 'pdp-main')

  return (
    <main className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-4 md:px-6 md:py-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: product.category, href: product.categorySlug ? `/categoria/${product.categorySlug}` : `/ricerca?categoria=${encodeURIComponent(product.category)}` }, { label: product.title }]} />

      <section className="grid gap-4 lg:grid-cols-2">
        <ProductGallery images={product.images} title={product.title} />
        <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4">
          <p className="text-sm text-slate-500">{product.brand}</p>
          <h1 className="text-2xl font-bold tracking-tight md:text-3xl">{product.title}</h1>
          <p className="text-3xl font-bold text-[#ff5a00]">{formatPrice(product.offers[0].price)}</p>
          <p className="text-sm text-slate-500">★ {product.rating} · {product.reviews} recensioni · da {product.offers.length} negozi</p>
          {mainOfferUrl ? <a href={mainOfferUrl} className="inline-flex h-11 items-center justify-center rounded-xl bg-[#ff5a00] px-4 text-sm font-semibold text-white" target="_blank" rel="noopener noreferrer sponsored">Vedi offerta</a> : <span className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700">Link non disponibile</span>}

          <details className="rounded-xl border border-slate-200 p-3" open>
            <summary>Descrizione prodotto</summary>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </details>
        </div>
      </section>

      <PriceComparisonTable offers={product.offers} slug={product.slug} />
      <ProductSpecsTable specs={product.specs} />
      <SimilarProductsSection products={similar} />
    </main>
  )
}

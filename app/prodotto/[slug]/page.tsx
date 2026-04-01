import { notFound } from 'next/navigation'
import Breadcrumb from '@/components/Breadcrumb'
import PriceComparisonTable from '@/components/PriceComparisonTable'
import ProductGallery from '@/components/ProductGallery'
import ProductSpecsTable from '@/components/ProductSpecsTable'
import SimilarProductsSection from '@/components/SimilarProductsSection'
import { getProductBySlug, getProducts } from '@/lib/products'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  return {
    title: product ? `${product.name} | Endu24` : 'Prodotto | Endu24',
    description: product?.description.slice(0, 150) ?? 'Compara prezzi prodotto su Endu24',
  }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = await getProductBySlug(slug)

  if (!product) return notFound()

  const similar = (await getProducts())
    .filter((item) => item.type === product.type && item.slug !== product.slug)
    .slice(0, 4)

  const best = product.offers[0]?.price ?? product.basePrice
  const bullets = product.description.split('. ').slice(0, 4).filter(Boolean)

  return (
    <main className="pdp-page container" itemScope itemType="https://schema.org/Product">
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'Prodotto' }, { label: product.name }]} />

      <section className="pdp-hero">
        <ProductGallery images={product.images} name={product.name} />
        <article className="pdp-summary">
          <p className="brand-label">{product.brand}</p>
          <h1 itemProp="name">{product.name}</h1>
          <p className="accent-price">€{best.toFixed(2)}</p>
          <p>★ {product.rating} ({product.ratingCount}) · da {product.offers.length} negozi</p>
          <a className="search-cta" href="#offerte">Vai all&apos;offerta</a>
          <p itemProp="description">{product.description}</p>
          <ul className="pdp-bullets">
            {bullets.map((point) => (<li key={point}>{point.trim()}.</li>))}
          </ul>
        </article>
      </section>

      <section id="offerte" className="section-block">
        <h2>Comparazione prezzi</h2>
        <PriceComparisonTable offers={product.offers} />
      </section>

      <section className="section-block pdp-specs">
        <h2>Specifiche tecniche</h2>
        <ProductSpecsTable specs={product.specs} fallback={{ brand: product.brand, category: product.category, type: product.type }} />
      </section>

      <SimilarProductsSection products={similar} />
    </main>
  )
}

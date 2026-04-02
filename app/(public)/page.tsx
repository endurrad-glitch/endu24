import Image from 'next/image'
import Link from 'next/link'
import { CategoryPills } from '@/components/layout/category-pills'
import { HeroSection } from '@/components/layout/hero-section'
import { NewsletterBlock } from '@/components/layout/newsletter-block'
import { ProductCarousel } from '@/components/layout/product-carousel'
import { getAllCategories, getBestSellers, getFeaturedProducts, getSpecialOffers } from '@/lib/products'

export default async function PublicHomePage() {
  const [topProducts, bestSellers, categories] = [getFeaturedProducts(10), getBestSellers(10), getAllCategories()]
  const specialOffers = getSpecialOffers(10)
  const heroProduct = topProducts[0] ?? bestSellers[0]

  if (!heroProduct) {
    return <div className="rounded-2xl bg-white p-8">Catalogo in aggiornamento.</div>
  }

  return (
    <div className="space-y-10">
      <HeroSection product={heroProduct} />
      <ProductCarousel title="Top prodotti" products={topProducts} />
      <ProductCarousel title="Offerte speciali" products={specialOffers.length > 0 ? specialOffers : topProducts} />
      <NewsletterBlock />
      <ProductCarousel title="Best seller" products={bestSellers} />

      <section className="grid gap-4 md:grid-cols-2">
        {topProducts.slice(0, 2).map((product) => (
          <article key={product.slug} className="relative h-56 overflow-hidden rounded-2xl">
            <Image src={product.image} alt={product.title} fill className="object-cover" />
            <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-black/70 p-5 text-white">
              <h3 className="text-xl font-semibold">{product.title}</h3>
              <Link href={`/prodotto/${product.slug}`} className="mt-3 inline-flex w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-slate-900">
                Vedi offerta
              </Link>
            </div>
          </article>
        ))}
      </section>

      <CategoryPills categories={categories} />
    </div>
  )
}

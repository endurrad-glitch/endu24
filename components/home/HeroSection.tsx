import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/products'

type HeroHighlight = {
  slot: string
  categoryName: string
  categorySlug: string
  product: Product
}

export function HeroSection({ highlights }: { highlights: HeroHighlight[] }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <p className="eyebrow">COMPARATORE PREZZI PREMIUM</p>
        <h1>Trova il miglior prezzo, senza perdere tempo</h1>
        <p>Confronta prodotti, categorie e offerte dai migliori store in modo semplice e veloce.</p>
        <div className="hero-actions">
          <Link href="/ricerca" className="primary-btn">Confronta ora</Link>
          <Link href="#categorie" className="secondary-btn">Esplora categorie</Link>
        </div>
      </div>

      <div className="hero-products" aria-label="Prodotti in evidenza per categoria">
        {highlights.map((item) => {
          const price = item.product.offers[0]?.price ?? item.product.price
          return (
            <Link key={`${item.slot}-${item.product.slug}`} href={`/categoria/${item.categorySlug}`} className="hero-product-card">
              <span className="hero-product-badge">{item.categoryName}</span>
              <div className="hero-product-image-wrap">
                <Image
                  src={item.product.image || '/file.svg'}
                  alt={item.product.title}
                  fill
                  sizes="(max-width: 980px) 45vw, 20vw"
                />
              </div>
              <p className="hero-product-title">{item.product.title}</p>
              <p className="hero-product-price">da €{price.toFixed(2)}</p>
            </Link>
          )
        })}
      </div>
    </section>
  )
}

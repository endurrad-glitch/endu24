import Link from 'next/link'

export type ProductHighlight = 'best-price' | 'discount'

type ProductCardProps = {
  name: string
  image: string
  minPrice: string
  oldPrice?: string
  discountLabel: string
  stores: number
  rating: number
  reviews: number
  href: string
  highlight?: ProductHighlight
}

function renderStars(rating: number) {
  const full = Math.round(rating)
  return '★'.repeat(full) + '☆'.repeat(Math.max(0, 5 - full))
}

function parsePriceValue(rawPrice: string) {
  const normalized = rawPrice.replace(/[€\s]/g, '').replace('.', '').replace(',', '.')
  return Number.parseFloat(normalized)
}

export default function ProductCard({
  name,
  image,
  minPrice,
  oldPrice,
  discountLabel,
  stores,
  rating,
  reviews,
  href,
  highlight = 'best-price',
}: ProductCardProps) {
  const numericPrice = parsePriceValue(minPrice)

  return (
    <article className="compare-card" itemScope itemType="https://schema.org/Product">
      <div className="card-image-wrap">
        <img src={image} alt={name} loading="lazy" className="card-image" itemProp="image" />
        <span className={`price-badge ${highlight === 'discount' ? 'badge-discount' : 'badge-best'}`}>
          {discountLabel}
        </span>
      </div>

      <div className="card-body">
        <h3 className="card-title" itemProp="name">{name}</h3>

        <p className="price-line" itemProp="offers" itemScope itemType="https://schema.org/Offer">
          <span className="price-prefix">da</span>
          <span className="lowest-price">{minPrice}</span>
          <meta itemProp="price" content={Number.isFinite(numericPrice) ? numericPrice.toString() : ''} />
          <meta itemProp="priceCurrency" content="EUR" />
          {oldPrice ? <span className="old-price">{oldPrice}</span> : null}
        </p>

        <p className="stores-count">da {stores} negozi</p>

        <p className="rating-row" aria-label={`Valutazione ${rating} su 5`}>
          <span className="stars" aria-hidden>{renderStars(rating)}</span>
          <span className="reviews">({reviews})</span>
        </p>

        <Link href={href} className="compare-btn">
          Confronta
        </Link>
      </div>
    </article>
  )
}

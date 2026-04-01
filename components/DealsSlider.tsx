import Link from 'next/link'

type Deal = {
  name: string
  image: string
  price: string
  was: string
  discount: string
  href: string
}

type DealsSliderProps = {
  deals: Deal[]
  isLoading?: boolean
}

export default function DealsSlider({ deals, isLoading = false }: DealsSliderProps) {
  if (isLoading) {
    return (
      <div className="deals-slider" aria-label="Caricamento offerte" aria-busy>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div key={idx} className="deal-card skeleton-card">
            <div className="skeleton skeleton-image" />
            <div className="skeleton skeleton-text" />
            <div className="skeleton skeleton-price" />
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="deals-slider" aria-label="Offerte del giorno" role="region">
      {deals.map((deal) => (
        <article className="deal-card" key={deal.name}>
          <img src={deal.image} alt={deal.name} loading="lazy" />
          <p className="deal-name">{deal.name}</p>
          <p className="deal-prices">
            <span className="deal-now">{deal.price}</span>
            <span className="deal-old">{deal.was}</span>
          </p>
          <p className="deal-discount">-{deal.discount}</p>
          <Link href={deal.href} className="deal-link">
            Vedi offerta
          </Link>
        </article>
      ))}
    </div>
  )
}

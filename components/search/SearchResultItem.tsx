import Link from 'next/link'
import Image from 'next/image'
import { formatPrice } from '@/lib/format'

type Props = {
  slug: string
  title: React.ReactNode
  image: string
  price: number
  rating: number
  reviews: number
  shops: number
  active: boolean
  onHover: () => void
  onSelect: () => void
}

export function SearchResultItem(props: Props) {
  return (
    <Link
      href={`/prodotto/${props.slug}`}
      className={`search-item ${props.active ? 'active' : ''}`}
      onMouseEnter={props.onHover}
      onClick={props.onSelect}
    >
      <Image src={props.image} alt="" width={52} height={52} loading="lazy" />
      <div>
        <p className="search-item-title">{props.title}</p>
        <p className="search-item-meta">
          <strong>{formatPrice(props.price)}</strong> · ★ {props.rating} ({props.reviews}) · da {props.shops} negozi
        </p>
      </div>
    </Link>
  )
}

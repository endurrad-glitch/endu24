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
      className={`grid grid-cols-[56px_minmax(0,1fr)] gap-3 rounded-xl border p-2 ${props.active ? 'border-orange-300 bg-orange-50' : 'border-slate-200 bg-white'}`}
      onMouseEnter={props.onHover}
      onClick={props.onSelect}
    >
      <Image src={props.image} alt="" width={56} height={56} className="rounded-lg object-cover" loading="lazy" />
      <div className="min-w-0">
        <p className="line-clamp-2 text-sm font-medium text-slate-800">{props.title}</p>
        <p className="text-xs text-slate-500">
          <strong>{formatPrice(props.price)}</strong> · ★ {props.rating} ({props.reviews}) · {props.shops} shop
        </p>
      </div>
    </Link>
  )
}

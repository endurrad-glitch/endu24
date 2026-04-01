import { KeyboardEvent } from 'react'

type SearchHit = {
  slug: string
  name: string
  image: string
  bestPrice: number
  rating: number
  ratingCount: number
  shopCount: number
}

function highlight(label: string, query: string) {
  if (!query.trim()) return label
  const normalized = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  const parts = label.split(new RegExp(`(${normalized})`, 'ig'))
  return parts.map((part, index) => (
    part.toLowerCase() === query.toLowerCase()
      ? <mark key={`${part}-${index}`}>{part}</mark>
      : <span key={`${part}-${index}`}>{part}</span>
  ))
}

export default function SearchResultItem({
  item,
  query,
  active,
  onClick,
  onHover,
}: {
  item: SearchHit
  query: string
  active: boolean
  onClick: () => void
  onHover: () => void
}) {
  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === 'Enter') onClick()
  }

  return (
    <button className={`search-item ${active ? 'active' : ''}`} onClick={onClick} onMouseEnter={onHover} onKeyDown={onKeyDown}>
      <img src={item.image} alt={item.name} loading="lazy" />
      <span className="search-item-body">
        <span className="search-title">{highlight(item.name, query)}</span>
        <span className="search-meta">
          <strong>€{item.bestPrice.toFixed(2)}</strong>
          <span>★ {item.rating} ({item.ratingCount})</span>
          <span>da {item.shopCount} negozi</span>
        </span>
      </span>
    </button>
  )
}

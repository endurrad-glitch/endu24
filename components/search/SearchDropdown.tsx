import { SearchResultItem } from '@/components/search/SearchResultItem'

type Item = {
  slug: string
  highlighted: React.ReactNode
  image: string
  price: number
  rating: number
  reviews: number
  shops: number
}

export function SearchDropdown({
  query,
  items,
  cursor,
  onHover,
  onClose,
}: {
  query: string
  items: Item[]
  cursor: number
  onHover: (index: number) => void
  onClose: () => void
}) {
  return (
    <div id="global-search-dropdown" className="search-dropdown" role="listbox" aria-label={`Risultati per ${query}`}>
      {items.length === 0 && <p className="empty-search">Nessun risultato rapido trovato.</p>}
      {items.map((item, index) => (
        <SearchResultItem
          key={item.slug}
          slug={item.slug}
          title={item.highlighted}
          image={item.image}
          price={item.price}
          rating={item.rating}
          reviews={item.reviews}
          shops={item.shops}
          active={cursor === index}
          onHover={() => onHover(index)}
          onSelect={onClose}
        />
      ))}
    </div>
  )
}

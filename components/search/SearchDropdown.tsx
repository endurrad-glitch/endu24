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

export function SearchDropdown({ query, items, cursor, onHover, onClose, mode = 'desktop' }: { query: string; items: Item[]; cursor: number; onHover: (index: number) => void; onClose: () => void; mode?: 'desktop' | 'mobile' }) {
  return (
    <div className={mode === 'mobile' ? 'grid gap-2' : 'absolute left-0 right-0 top-full z-50 mt-2 grid max-h-[65vh] gap-2 overflow-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl'} role="listbox" aria-label={`Risultati per ${query}`}>
      {items.length === 0 && <p className="p-3 text-sm text-slate-500">Nessun risultato rapido trovato.</p>}
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

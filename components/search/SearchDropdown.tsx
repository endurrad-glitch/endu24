import SearchResultItem from '@/components/search/SearchResultItem'

type SearchHit = {
  slug: string
  name: string
  image: string
  bestPrice: number
  rating: number
  ratingCount: number
  shopCount: number
}

export default function SearchDropdown({
  query,
  results,
  activeIndex,
  loading,
  onSelect,
  onHover,
  onViewAll,
}: {
  query: string
  results: SearchHit[]
  activeIndex: number
  loading: boolean
  onSelect: (slug: string) => void
  onHover: (index: number) => void
  onViewAll: () => void
}) {
  return (
    <div className="search-dropdown" role="listbox" aria-label="Risultati ricerca">
      {loading ? (
        <div className="search-skeleton-list">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="search-skeleton" />
          ))}
        </div>
      ) : null}
      {!loading && results.length === 0 ? <p className="search-empty">Nessun risultato trovato.</p> : null}

      {results.map((item, index) => (
        <SearchResultItem
          key={item.slug}
          item={item}
          query={query}
          active={index === activeIndex}
          onClick={() => onSelect(item.slug)}
          onHover={() => onHover(index)}
        />
      ))}

      {results.length > 0 ? (
        <button className="view-all-btn" onClick={onViewAll}>Vedi tutti i risultati</button>
      ) : null}
    </div>
  )
}

'use client'

import { FormEvent, KeyboardEvent, useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchDropdown from '@/components/search/SearchDropdown'

type SearchHit = {
  slug: string
  name: string
  image: string
  bestPrice: number
  rating: number
  ratingCount: number
  shopCount: number
}

export default function SearchBar({
  initialQuery = '',
  placeholder = 'Cerca casco, giacca, accessorio...',
  compact = false,
}: {
  initialQuery?: string
  placeholder?: string
  compact?: boolean
}) {
  const router = useRouter()
  const wrapperRef = useRef<HTMLDivElement | null>(null)
  const [query, setQuery] = useState(initialQuery)
  const [results, setResults] = useState<SearchHit[]>([])
  const [activeIndex, setActiveIndex] = useState(-1)
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const debounced = useMemo(() => query.trim(), [query])

  useEffect(() => {
    const timeout = setTimeout(async () => {
      if (!debounced) {
        setResults([])
        setLoading(false)
        return
      }
      setLoading(true)
      const response = await fetch(`/api/search?q=${encodeURIComponent(debounced)}`)
      const data = (await response.json()) as SearchHit[]
      setResults(data)
      setActiveIndex(data.length ? 0 : -1)
      setLoading(false)
    }, 260)

    return () => clearTimeout(timeout)
  }, [debounced])

  useEffect(() => {
    const close = (event: MouseEvent) => {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setOpen(false)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!query.trim()) return
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    setOpen(false)
    setMobileOpen(false)
  }

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!open || results.length === 0) return

    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setActiveIndex((prev) => (prev + 1) % results.length)
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setActiveIndex((prev) => (prev <= 0 ? results.length - 1 : prev - 1))
    }

    if (event.key === 'Enter') {
      event.preventDefault()
      const selected = results[activeIndex]
      if (selected) {
        router.push(`/prodotto/${selected.slug}`)
      } else {
        router.push(`/search?q=${encodeURIComponent(query.trim())}`)
      }
      setOpen(false)
      setMobileOpen(false)
    }
  }

  const goToProduct = (slug: string) => {
    router.push(`/prodotto/${slug}`)
    setOpen(false)
    setMobileOpen(false)
  }

  const goToAll = () => {
    router.push(`/search?q=${encodeURIComponent(query.trim())}`)
    setOpen(false)
    setMobileOpen(false)
  }

  return (
    <div ref={wrapperRef} className={`search-live ${compact ? 'compact' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <form className="search-shell" onSubmit={onSubmit} role="search" aria-label="Ricerca prodotti">
        <input
          className="search-input"
          value={query}
          onChange={(event) => {
            setQuery(event.target.value)
            setOpen(true)
          }}
          onFocus={() => {
            setOpen(true)
            if (window.matchMedia('(max-width: 780px)').matches) setMobileOpen(true)
          }}
          onKeyDown={onKeyDown}
          placeholder={placeholder}
        />
        <button className="search-cta" type="submit">Confronta prezzi</button>
      </form>

      {open && query.trim() ? (
        <SearchDropdown
          query={query}
          results={results}
          activeIndex={activeIndex}
          loading={loading}
          onSelect={goToProduct}
          onHover={setActiveIndex}
          onViewAll={goToAll}
        />
      ) : null}
    </div>
  )
}

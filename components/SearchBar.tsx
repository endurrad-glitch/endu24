'use client'

import { FormEvent, useState } from 'react'
import { useRouter } from 'next/navigation'

const quickKeywords = ['Shoei', 'Alpinestars', 'Interfono', 'Stivali']

export default function SearchBar() {
  const [query, setQuery] = useState('')
  const router = useRouter()

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const normalized = query.trim()
    if (!normalized) return
    router.push(`/categoria/caschi?q=${encodeURIComponent(normalized)}`)
  }

  return (
    <form className="search-shell" onSubmit={onSubmit} role="search" aria-label="Ricerca prodotti">
      <label htmlFor="search" className="sr-only">
        Cerca prodotto
      </label>
      <input
        id="search"
        name="q"
        className="search-input"
        placeholder="Cerca prodotto, marca o modello..."
        value={query}
        onChange={(event) => setQuery(event.target.value)}
      />
      <button className="search-cta" type="submit">
        Confronta prezzi
      </button>

      <div className="quick-tags" aria-label="Ricerche rapide">
        {quickKeywords.map((keyword) => (
          <button key={keyword} type="button" className="tag" onClick={() => setQuery(keyword)}>
            {keyword}
          </button>
        ))}
      </div>
    </form>
  )
}

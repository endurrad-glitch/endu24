'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'

type SearchHit = {
  slug: string
  title: string
  price?: number
}

type CategoryHit = {
  slug: string
  name: string
}

export function SearchBar() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [open, setOpen] = useState(false)
  const [products, setProducts] = useState<SearchHit[]>([])
  const [categories, setCategories] = useState<CategoryHit[]>([])

  const shouldSearch = useMemo(() => query.trim().length >= 2, [query])

  useEffect(() => {
    if (!shouldSearch) return

    const timer = setTimeout(async () => {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      const payload = (await response.json()) as { products: SearchHit[]; categories: CategoryHit[] }
      setProducts(payload.products)
      setCategories(payload.categories)
      setOpen(true)
    }, 200)

    return () => clearTimeout(timer)
  }, [query, shouldSearch])

  function submitSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setOpen(false)
    router.push(`/ricerca?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="relative w-full max-w-2xl">
      <form onSubmit={submitSearch}>
        <Input
          value={query}
          onChange={(e) => {
            const value = e.target.value
            setQuery(value)
            if (value.trim().length < 2) {
              setProducts([])
              setCategories([])
            }
          }}
          onFocus={() => setOpen(true)}
          placeholder="Cerca prodotti, marche o categorie"
          className="h-11 rounded-full border-slate-300 bg-slate-50 px-5"
          aria-label="Cerca nel catalogo"
        />
      </form>

      {open && shouldSearch ? (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-slate-200 bg-white p-4 shadow-lg">
          {products.length === 0 && categories.length === 0 ? (
            <p className="text-sm text-slate-500">Nessun risultato trovato.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Prodotti</p>
                <ul className="space-y-2">
                  {products.map((item) => (
                    <li key={item.slug}>
                      <Link className="text-sm hover:underline" href={`/prodotto/${item.slug}`} onClick={() => setOpen(false)}>
                        {item.title}
                        {typeof item.price === 'number' ? (
                          <span className="ml-2 text-xs text-slate-500">€{item.price.toFixed(2)}</span>
                        ) : null}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Categorie</p>
                <ul className="space-y-2">
                  {categories.map((item) => (
                    <li key={item.slug}>
                      <Link className="text-sm hover:underline" href={`/categoria/${item.slug}`} onClick={() => setOpen(false)}>
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </div>
  )
}

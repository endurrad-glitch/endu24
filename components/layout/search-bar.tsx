'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'

type SearchHit = {
  slug: string
  title: string
  price?: number
  image?: string
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

  function clearSearch() {
    setQuery('')
    setProducts([])
    setCategories([])
    setOpen(false)
  }

  return (
    <div className="relative w-full flex-1 max-w-none">
      <form onSubmit={submitSearch} className="relative">
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
          className="h-11 rounded-full border-[#2b2b2b]/10 bg-white px-5 pr-10"
          aria-label="Cerca nel catalogo"
        />
        {query.length > 0 ? (
          <button
            type="button"
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-[#2b2b2b] hover:text-[#2b2b2b]"
            aria-label="Pulisci ricerca"
          >
            ✕
          </button>
        ) : null}
      </form>

      {open && shouldSearch ? (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-[#2b2b2b]/10 bg-white p-4 shadow-lg">
          {products.length === 0 && categories.length === 0 ? (
            <p className="text-sm text-[#2b2b2b]/70">Nessun risultato trovato.</p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#2b2b2b]/70">Prodotti</p>
                <ul className="space-y-2">
                  {products.map((item) => (
                    <li key={item.slug}>
                      <Link className="block hover:underline" href={`/prodotto/${item.slug}`} onClick={() => setOpen(false)}>
                        <div className="flex items-center gap-3">
                          {item.image ? (
                            <Image src={item.image} alt={item.title} width={48} height={48} className="h-12 w-12 rounded-md object-cover" />
                          ) : null}
                          <div>
                            <p className="text-sm">{item.title}</p>
                            {typeof item.price === 'number' ? (
                              <span className="text-xs text-[#2b2b2b]/70">€{item.price.toFixed(2)}</span>
                            ) : null}
                          </div>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-[#2b2b2b]/70">Categorie</p>
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

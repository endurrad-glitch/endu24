'use client'

import { useRouter, useSearchParams } from 'next/navigation'

const SORTS = [
  { value: 'popularity', label: 'Popolarità' },
  { value: 'price_asc', label: 'Prezzo crescente' },
  { value: 'price_desc', label: 'Prezzo decrescente' },
]

export function FiltersSidebar() {
  const params = useSearchParams()
  const router = useRouter()

  function updateSort(sort: string) {
    const next = new URLSearchParams(params.toString())
    next.set('sort', sort)
    next.set('page', '1')
    router.push(`?${next.toString()}`)
  }

  return (
    <aside className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <p className="text-sm font-semibold">Ordina per</p>
      <div className="mt-3 space-y-2">
        {SORTS.map((sort) => (
          <button
            key={sort.value}
            onClick={() => updateSort(sort.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-left text-sm hover:bg-slate-50"
          >
            {sort.label}
          </button>
        ))}
      </div>
    </aside>
  )
}

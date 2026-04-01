'use client'

import type { ReactNode } from 'react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

type FilterState = { brand: string[]; category: string[]; priceRange: string[]; rating: string[]; availability: string[]; features: string[] }
type FilterOptionGroups = { brands: string[]; categories: string[]; availability: string[]; features: string[] }

const priceRanges = ['0-100', '100-250', '250-500', '500+']
const ratingOptions = ['4+', '4.5+']

export function FilterSidebar({ options, value, onChange, onReset, mode = 'desktop', onApply }: { options: FilterOptionGroups; value: FilterState; onChange: (value: FilterState) => void; onReset: () => void; mode?: 'desktop' | 'mobile'; onApply?: () => void }) {
  const [openState, setOpenState] = useState<Record<keyof FilterState, boolean>>({ brand: true, category: true, priceRange: false, rating: false, availability: false, features: false })

  const toggleFilter = (group: keyof FilterState, entry: string) => {
    const exists = value[group].includes(entry)
    const next = exists ? value[group].filter((item) => item !== entry) : [...value[group], entry]
    onChange({ ...value, [group]: next })
  }

  return (
    <aside className={`grid gap-3 rounded-2xl border bg-white p-3 ${mode === 'mobile' ? 'border-none p-0' : 'border-slate-200'}`}>
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filtri</h3>
        <button type="button" className="text-sm text-[#ff5a00]" onClick={onReset}>Reset</button>
      </div>

      <FilterGroup title="Brand" open={openState.brand} onToggle={() => setOpenState((p) => ({ ...p, brand: !p.brand }))}>{options.brands.map((brand) => <FilterCheck key={brand} label={brand} checked={value.brand.includes(brand)} onChange={() => toggleFilter('brand', brand)} />)}</FilterGroup>
      <FilterGroup title="Categoria" open={openState.category} onToggle={() => setOpenState((p) => ({ ...p, category: !p.category }))}>{options.categories.map((category) => <FilterCheck key={category} label={category} checked={value.category.includes(category)} onChange={() => toggleFilter('category', category)} />)}</FilterGroup>
      <FilterGroup title="Fascia prezzo" open={openState.priceRange} onToggle={() => setOpenState((p) => ({ ...p, priceRange: !p.priceRange }))}>{priceRanges.map((range) => <FilterCheck key={range} label={range === '500+' ? 'Oltre €500' : `€${range.replace('-', ' - €')}`} checked={value.priceRange.includes(range)} onChange={() => toggleFilter('priceRange', range)} />)}</FilterGroup>
      <FilterGroup title="Valutazione" open={openState.rating} onToggle={() => setOpenState((p) => ({ ...p, rating: !p.rating }))}>{ratingOptions.map((rating) => <FilterCheck key={rating} label={`${rating} stelle`} checked={value.rating.includes(rating)} onChange={() => toggleFilter('rating', rating)} />)}</FilterGroup>

      {mode === 'mobile' && <Button onClick={onApply}>Applica filtri</Button>}
    </aside>
  )
}

function FilterGroup({ title, children, open, onToggle }: { title: string; children: ReactNode; open: boolean; onToggle: () => void }) {
  return (
    <section className="border-t border-slate-100 pt-2">
      <button type="button" className="flex w-full items-center justify-between text-sm font-medium" onClick={onToggle}><span>{title}</span><span>{open ? '−' : '+'}</span></button>
      {open && <div className="mt-2 grid gap-2">{children}</div>}
    </section>
  )
}

function FilterCheck({ label, checked, onChange }: { label: string; checked: boolean; onChange: () => void }) {
  return <label className="flex items-center gap-2 text-sm text-slate-700"><input type="checkbox" checked={checked} onChange={onChange} className="h-4 w-4 accent-[#ff5a00]" /><span>{label}</span></label>
}

export type { FilterState, FilterOptionGroups }

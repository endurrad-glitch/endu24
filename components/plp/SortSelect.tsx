'use client'

export type SortMode = 'popularity' | 'savings' | 'priceAsc' | 'priceDesc' | 'newest'

const options: Array<{ value: SortMode; label: string }> = [
  { value: 'popularity', label: 'Popolarità' },
  { value: 'savings', label: 'Maggiore Risparmio' },
  { value: 'priceAsc', label: 'Prezzo crescente' },
  { value: 'priceDesc', label: 'Prezzo: dal più alto' },
  { value: 'newest', label: 'Novità' },
]

export function SortSelect({ value, onChange }: { value: SortMode; onChange: (value: SortMode) => void }) {
  return (
    <select className="h-10 rounded-xl border border-slate-200 bg-white px-3 text-sm" value={value} onChange={(event) => onChange(event.target.value as SortMode)} aria-label="Ordina risultati">
      {options.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
    </select>
  )
}

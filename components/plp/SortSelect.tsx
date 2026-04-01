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
    <label className="sort-select-wrap" aria-label="Ordina risultati">
      <span className="sr-only">Ordina risultati</span>
      <select className="sort-select" value={value} onChange={(event) => onChange(event.target.value as SortMode)}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>{option.label}</option>
        ))}
      </select>
    </label>
  )
}

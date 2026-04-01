'use client'

type ViewMode = 'list' | 'grid'

export function ViewToggle({ view, onChange }: { view: ViewMode; onChange: (view: ViewMode) => void }) {
  return (
    <div className="inline-flex rounded-xl border border-slate-200 bg-white p-1" role="group" aria-label="Modalità visualizzazione">
      <button type="button" className={`rounded-lg px-2 py-1 text-xs ${view === 'list' ? 'bg-slate-100 font-semibold' : ''}`} onClick={() => onChange('list')} aria-pressed={view === 'list'}>Lista</button>
      <button type="button" className={`rounded-lg px-2 py-1 text-xs ${view === 'grid' ? 'bg-slate-100 font-semibold' : ''}`} onClick={() => onChange('grid')} aria-pressed={view === 'grid'}>Griglia</button>
    </div>
  )
}

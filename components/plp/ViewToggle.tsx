'use client'

type ViewMode = 'list' | 'grid'

export function ViewToggle({ view, onChange }: { view: ViewMode; onChange: (view: ViewMode) => void }) {
  return (
    <div className="view-toggle" role="group" aria-label="Modalità visualizzazione">
      <button
        type="button"
        className={view === 'list' ? 'active' : ''}
        onClick={() => onChange('list')}
        aria-pressed={view === 'list'}
      >
        ☰ Lista
      </button>
      <button
        type="button"
        className={view === 'grid' ? 'active' : ''}
        onClick={() => onChange('grid')}
        aria-pressed={view === 'grid'}
      >
        ⊞ Griglia
      </button>
    </div>
  )
}

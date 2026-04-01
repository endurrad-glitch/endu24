'use client'

import type { CategoryNode } from '@/lib/catalog'
import { CategoryTree } from '@/components/CategoryTree'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  categories: CategoryNode[]
}

export function MobileMenu({ open, onClose, categories }: MobileMenuProps) {
  const rootCategories = categories.filter((category) => category.level === 0)

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[95] lg:hidden" role="dialog" aria-modal="true" aria-label="Menu categorie mobile">
      <button type="button" aria-label="Chiudi menu" className="absolute inset-0 bg-slate-900/45" onClick={onClose} />

      <section className="relative h-full w-[88vw] max-w-sm overflow-y-auto bg-white px-4 py-5 shadow-2xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold text-slate-900">Menu categorie</h2>
          <button
            type="button"
            className="rounded-lg border border-slate-200 px-2 py-1 text-sm font-medium text-slate-700"
            onClick={onClose}
          >
            Chiudi
          </button>
        </div>

        <div className="grid gap-3 pb-4">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Naviga per categoria</p>
          <CategoryTree nodes={rootCategories} onNavigate={onClose} />
        </div>
      </section>
    </div>
  )
}

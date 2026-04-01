'use client'

import { Sheet } from '@/components/ui/sheet'
import type { CategoryNode } from '@/lib/catalog'
import { CategoryTree } from '@/components/CategoryTree'

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  categories: CategoryNode[]
}

export function MobileMenu({ open, onClose, categories }: MobileMenuProps) {
  const rootCategories = categories.filter((category) => category.level === 0)

  return (
    <Sheet open={open} onClose={onClose} title="Menu categorie">
      <div className="grid gap-3">
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">Naviga per categoria</p>
        <CategoryTree nodes={rootCategories} onNavigate={onClose} />
      </div>
    </Sheet>
  )
}

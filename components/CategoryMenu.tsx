'use client'

import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'

type Props = {
  categories: CategoryNode[]
  onNavigate?: () => void
}

export function CategoryMenu({ categories, onNavigate }: Props) {
  const rootCategories = categories.filter((category) => category.level === 0)

  return (
    <nav aria-label="Categorie">
      <ul className="grid gap-2">
        {rootCategories.map((category) => (
          <li key={category.id}>
            <Link
              href={`/categoria/${category.slug}`}
              onClick={onNavigate}
              className="block rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700"
            >
              {category.name}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}

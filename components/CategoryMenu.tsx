'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'

type Props = {
  categories: CategoryNode[]
}

export function CategoryMenu({ categories }: Props) {
  const [openSlug, setOpenSlug] = useState<string | null>(null)

  return (
    <nav className="category-menu" aria-label="Categorie principali">
      <div className="category-menu-scroll">
        {categories
          .filter((category) => category.level === 0)
          .map((category) => {
            const isOpen = openSlug === category.slug

            return (
              <div
                key={category.id}
                className={`category-item ${isOpen ? 'open' : ''}`}
                onMouseEnter={() => setOpenSlug(category.slug)}
                onMouseLeave={() => setOpenSlug(null)}
              >
                <div className="category-trigger-wrap">
                  <Link href={`/categoria/${category.slug}`} className="category-trigger-link">
                    <span className="category-dot" aria-hidden />
                    {category.name}
                  </Link>
                  <button
                    type="button"
                    className="category-trigger-toggle"
                    onClick={() => setOpenSlug(isOpen ? null : category.slug)}
                    aria-expanded={isOpen}
                    aria-label={`Apri sottomenu ${category.name}`}
                  >
                    ▾
                  </button>
                </div>

                <div className="mega-menu" role="menu">
                  <div className="mega-col mega-col-parent">
                    <Link href={`/categoria/${category.slug}`} className="mega-title">Tutti i prodotti {category.name}</Link>
                  </div>

                  {category.children.map((child) => (
                    <div key={child.id} className="mega-col">
                      <Link href={`/categoria/${child.slug}`} className="mega-title">{child.name}</Link>
                      <div className="mega-links">
                        {child.children.map((grandchild) => (
                          <Link key={grandchild.id} href={`/categoria/${grandchild.slug}`}>{grandchild.name}</Link>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
      </div>
    </nav>
  )
}

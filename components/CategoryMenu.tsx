'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'

export function CategoryMenu({ categories }: { categories: CategoryNode[] }) {
  const [openLabel, setOpenLabel] = useState<string | null>(null)

  return (
    <nav className="category-menu" aria-label="Categorie principali">
      <div className="category-menu-scroll">
        {categories.map((category) => {
          const isOpen = openLabel === category.label
          return (
            <div
              key={category.label}
              className={`category-item ${isOpen ? 'open' : ''}`}
              onMouseEnter={() => setOpenLabel(category.label)}
              onMouseLeave={() => setOpenLabel(null)}
            >
              <button
                type="button"
                className="category-trigger"
                onClick={() => setOpenLabel(isOpen ? null : category.label)}
                aria-expanded={isOpen}
              >
                <span className="category-dot" aria-hidden />
                {category.label}
              </button>

              <div className="mega-menu">
                <div className="mega-col mega-col-parent">
                  <Link href={category.href} className="mega-title">Vedi tutto in {category.label}</Link>
                </div>
                {category.children.map((sub) => (
                  <div key={sub.label} className="mega-col">
                    <Link href={sub.href} className="mega-title">{sub.label}</Link>
                    <div className="mega-links">
                      {sub.children.map((child) => (
                        <Link key={child.label} href={child.href}>{child.label}</Link>
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

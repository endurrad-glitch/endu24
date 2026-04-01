'use client'

import { useState } from 'react'
import Link from 'next/link'

type CategoryNode = {
  label: string
  href: string
  children?: Array<{
    label: string
    href: string
    children?: Array<{ label: string; href: string }>
  }>
}

export function CategoryMenu({ categories }: { categories: CategoryNode[] }) {
  const [mobileOpen, setMobileOpen] = useState<string | null>(null)

  return (
    <nav className="category-menu" aria-label="Categorie principali">
      <div className="category-menu-scroll">
        {categories.map((category) => {
          const isOpen = mobileOpen === category.label
          return (
            <div
              key={category.label}
              className={`category-item ${isOpen ? 'open' : ''}`}
              onMouseEnter={() => setMobileOpen(category.label)}
              onMouseLeave={() => setMobileOpen(null)}
            >
              <button
                type="button"
                className="category-trigger"
                onClick={() => setMobileOpen(isOpen ? null : category.label)}
              >
                <span className="category-dot" aria-hidden />
                {category.label}
              </button>

              <div className="mega-menu">
                {(category.children || []).map((sub) => (
                  <div key={sub.label} className="mega-col">
                    <Link href={sub.href} className="mega-title">{sub.label}</Link>
                    <div className="mega-links">
                      {(sub.children || []).map((child) => (
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

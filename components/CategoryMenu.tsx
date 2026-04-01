'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'

type Props = {
  categories: CategoryNode[]
}


function CategoryBranches({ nodes, onNavigate }: { nodes: CategoryNode[], onNavigate?: () => void }) {
  return (
    <ul className="category-branch-list">
      {nodes.map((node) => (
        <li key={node.id}>
          <Link href={`/categoria/${node.slug}`} onClick={onNavigate}>{node.name}</Link>
          {node.children.length > 0 && <CategoryBranches nodes={node.children} onNavigate={onNavigate} />}
        </li>
      ))}
    </ul>
  )
}

export function CategoryMenu({ categories }: Props) {
  const [openId, setOpenId] = useState<number | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Set<number>>(new Set())
  const rootCategories = categories.filter((category) => category.level === 0)


  const toggleMobile = (categoryId: number) => {
    setMobileExpanded((previous) => {
      const next = new Set(previous)
      if (next.has(categoryId)) next.delete(categoryId)
      else next.add(categoryId)
      return next
    })
  }

  return (
    <nav className="category-menu" aria-label="Categorie principali">
      <div className="category-menu-scroll">
        {rootCategories.map((category) => {
          const isDesktopOpen = openId === category.id
          const isMobileOpen = mobileExpanded.has(category.id)

          return (
            <div
              key={category.id}
              className={`category-item ${isDesktopOpen ? 'open' : ''}`}
              onMouseEnter={() => setOpenId(category.id)}
              onMouseLeave={() => setOpenId(null)}
            >
              <div className="category-trigger-wrap">
                <Link href={`/categoria/${category.slug}`} className="category-trigger-link">
                  <span className="category-dot" aria-hidden />
                  {category.name}
                </Link>
                {category.children.length > 0 && (
                  <button
                    type="button"
                    className="category-trigger-toggle"
                    onClick={() => toggleMobile(category.id)}
                    aria-expanded={isMobileOpen}
                    aria-label={`Apri sottomenu ${category.name}`}
                  >
                    ▾
                  </button>
                )}
              </div>

              {category.children.length > 0 && (
                <div className={`mega-menu ${isMobileOpen ? 'mobile-open' : ''}`} role="menu">
                  <div className="mega-col mega-col-parent">
                    <Link href={`/categoria/${category.slug}`} className="mega-title" onClick={() => setMobileExpanded(new Set())}>
                      Tutti i prodotti {category.name}
                    </Link>
                  </div>
                  {category.children.map((child) => (
                    <div key={child.id} className="mega-col">
                      <Link href={`/categoria/${child.slug}`} className="mega-title" onClick={() => setMobileExpanded(new Set())}>
                        {child.name}
                      </Link>
                      {child.children.length > 0 && (
                        <div className="mega-links">
                          <CategoryBranches nodes={child.children} onNavigate={() => setMobileExpanded(new Set())} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      <div className="mobile-category-tree" aria-label="Navigazione categorie mobile">
        {rootCategories.map((category) => {
          const expanded = mobileExpanded.has(category.id)
          return (
            <div key={`mobile-${category.id}`} className="mobile-category-group">
              <div className="mobile-category-head">
                <Link href={`/categoria/${category.slug}`}>{category.name}</Link>
                {category.children.length > 0 && (
                  <button type="button" onClick={() => toggleMobile(category.id)} aria-expanded={expanded}>
                    {expanded ? '−' : '+'}
                  </button>
                )}
              </div>
              {expanded && category.children.length > 0 && (
                <CategoryBranches nodes={category.children} onNavigate={() => setMobileExpanded(new Set())} />
              )}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

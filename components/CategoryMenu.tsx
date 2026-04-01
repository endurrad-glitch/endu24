'use client'

import { useState } from 'react'
import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'
import { MegaMenu } from '@/components/MegaMenu'

type Props = {
  categories: CategoryNode[]
  isSearchOpen: boolean
  onMenuOpenChange: (isOpen: boolean) => void
  mode: 'desktop' | 'mobile'
}

function CategoryBranches({ nodes, onNavigate }: { nodes: CategoryNode[]; onNavigate?: () => void }) {
  return (
    <ul className="category-branch-list">
      {nodes.map((node) => (
        <li key={node.id}>
          <Link href={`/categoria/${node.slug}`} onClick={onNavigate}>
            {node.name}
          </Link>
          {node.children.length > 0 && <CategoryBranches nodes={node.children} onNavigate={onNavigate} />}
        </li>
      ))}
    </ul>
  )
}

export function CategoryMenu({ categories, isSearchOpen, onMenuOpenChange, mode }: Props) {
  const [desktopOpenId, setDesktopOpenId] = useState<number | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Set<number>>(new Set())
  const rootCategories = categories.filter((category) => category.level === 0)

  const toggleMobile = (categoryId: number) => {
    if (isSearchOpen) return

    setMobileExpanded((previous) => {
      const next = new Set(previous)
      if (next.has(categoryId)) next.delete(categoryId)
      else next.add(categoryId)
      onMenuOpenChange(next.size > 0)
      return next
    })
  }

  const closeAll = () => {
    setDesktopOpenId(null)
    setMobileExpanded(new Set())
    onMenuOpenChange(false)
  }

  if (mode === 'mobile') {
    return (
      <nav className="category-menu category-menu-mobile" aria-label="Navigazione categorie mobile">
        <div className="mobile-category-tree">
          {rootCategories.map((category) => {
            const expanded = !isSearchOpen && mobileExpanded.has(category.id)
            return (
              <div key={`mobile-${category.id}`} className="mobile-category-group">
                <div className="mobile-category-head">
                  <Link href={`/categoria/${category.slug}`} onClick={closeAll}>
                    {category.name}
                  </Link>
                  {category.children.length > 0 && (
                    <button type="button" onClick={() => toggleMobile(category.id)} aria-expanded={expanded} disabled={isSearchOpen}>
                      {expanded ? '−' : '+'}
                    </button>
                  )}
                </div>
                {expanded && category.children.length > 0 && (
                  <CategoryBranches nodes={category.children} onNavigate={closeAll} />
                )}
              </div>
            )
          })}
        </div>
      </nav>
    )
  }

  return (
    <nav className="category-menu" aria-label="Categorie principali" onMouseLeave={() => setDesktopOpenId(null)}>
      <div className="category-menu-scroll">
        {rootCategories.map((category) => {
          const isDesktopOpen = !isSearchOpen && desktopOpenId === category.id

          return (
            <div
              key={category.id}
              className={`category-item ${isDesktopOpen ? 'open' : ''}`}
              onMouseEnter={() => category.children.length > 0 && setDesktopOpenId(category.id)}
            >
              <div className="category-trigger-wrap">
                <Link href={`/categoria/${category.slug}`} className="category-trigger-link" onClick={closeAll}>
                  <span className="category-dot" aria-hidden />
                  {category.name}
                </Link>
              </div>

              {category.children.length > 0 && isDesktopOpen && <MegaMenu category={category} onNavigate={closeAll} />}
            </div>
          )
        })}
      </div>
    </nav>
  )
}

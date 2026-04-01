'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'
import { MegaMenu } from '@/components/MegaMenu'

type Props = {
  categories: CategoryNode[]
  isSearchOpen: boolean
  isMenuOpen: boolean
  onMenuOpenChange: (isOpen: boolean) => void
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

export function CategoryMenu({ categories, isSearchOpen, isMenuOpen, onMenuOpenChange }: Props) {
  const [desktopOpenId, setDesktopOpenId] = useState<number | null>(null)
  const [mobileExpanded, setMobileExpanded] = useState<Set<number>>(new Set())
  const navRef = useRef<HTMLElement>(null)
  const rootCategories = categories.filter((category) => category.level === 0)

  useEffect(() => {
    onMenuOpenChange(desktopOpenId !== null || mobileExpanded.size > 0)
  }, [desktopOpenId, mobileExpanded, onMenuOpenChange])

  useEffect(() => {
    if (!isMenuOpen) return

    const onOutsideClick = (event: MouseEvent) => {
      if (!navRef.current?.contains(event.target as Node)) {
        setDesktopOpenId(null)
        setMobileExpanded(new Set())
      }
    }

    document.addEventListener('mousedown', onOutsideClick)
    return () => document.removeEventListener('mousedown', onOutsideClick)
  }, [isMenuOpen])

  const toggleMobile = (categoryId: number) => {
    if (isSearchOpen) return

    setDesktopOpenId(null)
    setMobileExpanded((previous) => {
      const next = new Set(previous)
      if (next.has(categoryId)) next.delete(categoryId)
      else next.add(categoryId)
      return next
    })
  }

  const openDesktopMenu = (categoryId: number) => {
    if (isSearchOpen) return
    setDesktopOpenId(categoryId)
  }

  const closeAll = () => {
    setDesktopOpenId(null)
    setMobileExpanded(new Set())
  }

  return (
    <nav className="category-menu" aria-label="Categorie principali" ref={navRef} onMouseLeave={() => setDesktopOpenId(null)}>
      <div className="category-menu-scroll">
        {rootCategories.map((category) => {
          const isDesktopOpen = !isSearchOpen && desktopOpenId === category.id
          const isMobileOpen = !isSearchOpen && mobileExpanded.has(category.id)

          return (
            <div
              key={category.id}
              className={`category-item ${isDesktopOpen ? 'open' : ''}`}
              onMouseEnter={() => category.children.length > 0 && openDesktopMenu(category.id)}
            >
              <div className="category-trigger-wrap">
                <Link href={`/categoria/${category.slug}`} className="category-trigger-link" onClick={closeAll}>
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
                    disabled={isSearchOpen}
                  >
                    ▾
                  </button>
                )}
              </div>

              {category.children.length > 0 && isDesktopOpen && <MegaMenu category={category} onNavigate={closeAll} />}
            </div>
          )
        })}
      </div>

      <div className="mobile-category-tree" aria-label="Navigazione categorie mobile">
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

'use client'

import Link from 'next/link'
import { useState } from 'react'
import type { CategoryNode } from '@/lib/catalog'

type CategoryTreeProps = {
  nodes: CategoryNode[]
  level?: number
  onNavigate?: () => void
}

function CategoryBranch({ node, level, onNavigate }: { node: CategoryNode; level: number; onNavigate?: () => void }) {
  const [isOpen, setIsOpen] = useState(level < 1)
  const hasChildren = node.children.length > 0

  return (
    <li className="rounded-xl border border-slate-200 bg-white">
      <div className="flex items-center justify-between gap-2 px-3 py-2">
        <Link href={`/categoria/${node.slug}`} onClick={onNavigate} className="min-h-11 flex-1 py-1 text-sm font-medium text-slate-800">
          {node.name}
        </Link>
        {hasChildren && (
          <button
            type="button"
            className="rounded-md border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600"
            onClick={() => setIsOpen((prev) => !prev)}
            aria-expanded={isOpen}
            aria-label={`${isOpen ? 'Chiudi' : 'Apri'} ${node.name}`}
          >
            {isOpen ? '−' : '+'}
          </button>
        )}
      </div>

      {hasChildren && isOpen && (
        <ul className="grid gap-2 border-t border-slate-100 px-3 py-3">
          {node.children.map((child) => <CategoryBranch key={child.id} node={child} level={level + 1} onNavigate={onNavigate} />)}
        </ul>
      )}
    </li>
  )
}

export function CategoryTree({ nodes, level = 0, onNavigate }: CategoryTreeProps) {
  return (
    <ul className="grid gap-2">
      {nodes.map((node) => <CategoryBranch key={node.id} node={node} level={level} onNavigate={onNavigate} />)}
    </ul>
  )
}

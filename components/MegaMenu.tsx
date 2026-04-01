import Link from 'next/link'
import type { CategoryNode } from '@/lib/catalog'

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

export function MegaMenu({ category, onNavigate }: { category: CategoryNode; onNavigate: () => void }) {
  return (
    <div className="mega-menu" role="menu" aria-label={`Sottocategorie ${category.name}`}>
      <div className="mega-col mega-col-parent">
        <Link href={`/categoria/${category.slug}`} className="mega-title" onClick={onNavigate}>
          Tutti i prodotti {category.name}
        </Link>
      </div>
      {category.children.map((child) => (
        <div key={child.id} className="mega-col">
          <Link href={`/categoria/${child.slug}`} className="mega-title" onClick={onNavigate}>
            {child.name}
          </Link>
          {child.children.length > 0 && (
            <div className="mega-links">
              <CategoryBranches nodes={child.children} onNavigate={onNavigate} />
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

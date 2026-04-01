import Link from 'next/link'

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="flex items-center gap-2 overflow-x-auto whitespace-nowrap text-xs text-slate-500" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label + index} className="inline-flex items-center gap-2">
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          {index < items.length - 1 && <span aria-hidden>›</span>}
        </span>
      ))}
    </nav>
  )
}

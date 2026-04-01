import Link from 'next/link'

export function Breadcrumb({ items }: { items: { label: string; href?: string }[] }) {
  return (
    <nav className="breadcrumb" aria-label="Breadcrumb">
      {items.map((item, index) => (
        <span key={item.label + index} className="breadcrumb-item">
          {item.href ? <Link href={item.href}>{item.label}</Link> : item.label}
          {index < items.length - 1 && <span aria-hidden>›</span>}
        </span>
      ))}
    </nav>
  )
}

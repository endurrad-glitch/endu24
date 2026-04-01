import Link from 'next/link'

export default function CategoryGrid({ categories }: { categories: string[] }) {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <Link key={category} href={`/search?category=${encodeURIComponent(category)}`} className="category-box">
          <img src="/window.svg" alt={category} loading="lazy" />
          <span className="category-icon" aria-hidden>⚫</span>
          <h3>{category}</h3>
        </Link>
      ))}
    </div>
  )
}

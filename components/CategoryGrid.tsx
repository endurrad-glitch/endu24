import Link from 'next/link'

type Category = {
  name: string
  icon: string
  href: string
  image: string
}

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <div className="category-grid">
      {categories.map((category) => (
        <Link key={category.name} href={category.href} className="category-box">
          <img src={category.image} alt={category.name} loading="lazy" />
          <span className="category-icon" aria-hidden>{category.icon}</span>
          <h3>{category.name}</h3>
        </Link>
      ))}
    </div>
  )
}

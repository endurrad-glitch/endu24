import Link from 'next/link'

export function BrandLogo() {
  return (
    <Link href="https://endu24.com" className="brand">
      <span className="brand-badge">E24</span>
      <span className="brand-text">endu24</span>
    </Link>
  )
}

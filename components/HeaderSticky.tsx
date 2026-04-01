import Link from 'next/link'
import SearchBar from '@/components/SearchBar'

export default function HeaderSticky() {
  return (
    <header className="site-header">
      <div className="container header-sticky-inner">
        <Link href="/" className="brand" aria-label="Endu24 home">
          <span className="brand-badge">E24</span>
          <span className="brand-text">endu24</span>
        </Link>

        <SearchBar compact />

        <div className="header-icons" aria-hidden>
          <span>♡</span>
          <span>☰</span>
        </div>
      </div>
    </header>
  )
}

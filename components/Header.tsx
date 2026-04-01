import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand">
          <span className="brand-badge">E24</span>
          <span className="brand-text">endu24</span>
        </Link>

        <nav className="main-nav" aria-label="Navigazione principale">
          <Link href="/categoria/caschi">Caschi</Link>
          <Link href="/categoria/abbigliamento">Abbigliamento</Link>
          <Link href="/categoria/accessori">Accessori</Link>
        </nav>
      </div>
    </header>
  )
}
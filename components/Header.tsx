import Link from 'next/link'

export default function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="Endu24 home">
          <span className="brand-badge">E24</span>
          <span className="brand-text">endu24</span>
        </Link>

        <nav className="main-nav" aria-label="Navigazione principale">
          <Link href="/">Home</Link>
          <Link href="/search">Compara</Link>
          <Link href="/categoria/caschi">Categorie</Link>
        </nav>
      </div>
    </header>
  )
}

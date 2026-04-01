import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© {new Date().getFullYear()} ENDU24 — Comparatore prezzi premium.</p>
        <nav>
          <Link href="/search">Ricerca</Link>
          <Link href="/">Home</Link>
        </nav>
      </div>
    </footer>
  )
}

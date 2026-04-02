import Link from 'next/link'

export function PublicFooter() {
  return (
    <footer className="mt-16 border-t border-slate-200 bg-white">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-4 py-8 text-sm text-slate-600 md:flex-row md:justify-between">
        <p>© {new Date().getFullYear()} endu24</p>
        <nav className="flex flex-wrap gap-4">
          <Link href="/termini-e-condizioni">Termini</Link>
          <Link href="/privacy-policy">Privacy</Link>
          <Link href="/contatti">Contatti</Link>
          <Link href="/come-funziona">Come funziona</Link>
        </nav>
      </div>
    </footer>
  )
}

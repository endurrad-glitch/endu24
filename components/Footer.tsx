import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-10 border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-6xl gap-6 px-4 py-8 md:grid-cols-3 md:px-6">
        <div className="grid gap-2">
          <p className="text-sm font-semibold text-slate-900">ENDU24</p>
          <p className="text-sm text-slate-500">Comparatore prezzi premium per accessori e abbigliamento moto.</p>
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-semibold text-slate-900">Navigazione</p>
          <Link href="/#categorie" className="text-sm text-slate-600 transition-colors hover:text-[#ff6a00]">Categorie</Link>
          <Link href="/#offerte" className="text-sm text-slate-600 transition-colors hover:text-[#ff6a00]">Offerte in evidenza</Link>
          <Link href="/ricerca" className="text-sm text-slate-600 transition-colors hover:text-[#ff6a00]">Ricerca prodotti</Link>
        </div>

        <div className="grid gap-2">
          <p className="text-sm font-semibold text-slate-900">Supporto</p>
          <a href="mailto:info@endu24.it" className="text-sm text-slate-600 transition-colors hover:text-[#ff6a00]">info@endu24.it</a>
          <p className="text-sm text-slate-500">Prezzi e disponibilità possono variare in tempo reale.</p>
        </div>
      </div>

      <div className="border-t border-slate-200">
        <p className="mx-auto w-full max-w-6xl px-4 py-4 text-center text-xs text-slate-500 md:px-6">
          © 2026 ENDU24 · Tutti i diritti riservati.
        </p>
      </div>
    </footer>
  )
}

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export function HomepageHero() {
  return (
    <section className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="grid gap-3">
        <h1 className="text-2xl font-semibold leading-tight text-[#2b2b2b]">
          Trova il miglior prezzo per il tuo prossimo acquisto
        </h1>
        <p className="text-sm text-slate-600">Confronta prezzi da centinaia di negozi</p>

        <form action="/ricerca" className="grid gap-3" role="search">
          <Input
            name="q"
            placeholder="Cerca casco, giacca, interfono, accessori..."
            aria-label="Cerca prodotti"
            className="h-12 rounded-full border-slate-300 px-4 text-sm"
          />
          <Button type="submit" className="h-11 w-full rounded-full">
            Confronta ora
          </Button>
        </form>

        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          <Link href="/categoria/caschi" className="rounded-full bg-slate-100 px-3 py-1">Caschi</Link>
          <Link href="/categoria/abbigliamento" className="rounded-full bg-slate-100 px-3 py-1">Abbigliamento</Link>
          <Link href="/categoria/accessori" className="rounded-full bg-slate-100 px-3 py-1">Accessori</Link>
        </div>
      </div>
    </section>
  )
}

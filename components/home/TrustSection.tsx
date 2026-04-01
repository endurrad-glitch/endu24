import { Card } from '@/components/ui/card'

export function TrustSection({ products, shops }: { products: number; shops: number }) {
  return (
    <section className="grid gap-3 md:grid-cols-3">
      <Card className="grid place-items-center gap-1 p-4 text-center"><strong className="text-2xl">{products}+</strong><span className="text-sm text-slate-500">prodotti indicizzati</span></Card>
      <Card className="grid place-items-center gap-1 p-4 text-center"><strong className="text-2xl">{shops}+</strong><span className="text-sm text-slate-500">negozi comparati</span></Card>
      <Card className="grid place-items-center gap-1 p-4 text-center"><strong className="text-2xl">24/7</strong><span className="text-sm text-slate-500">aggiornamento offerte</span></Card>
    </section>
  )
}

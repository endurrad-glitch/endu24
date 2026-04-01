import { Card } from '@/components/ui/card'

export function TrustSection({ products, shops }: { products: number; shops: number }) {
  return (
    <section className="grid gap-4 grid-cols-2">
      <Card className="grid min-h-24 place-items-center gap-1 rounded-2xl p-3 text-center">
        <strong className="text-xl text-[#2b2b2b]">Oltre {products}</strong>
        <span className="text-xs text-slate-500">prodotti indicizzati</span>
      </Card>
      <Card className="grid min-h-24 place-items-center gap-1 rounded-2xl p-3 text-center">
        <strong className="text-xl text-[#2b2b2b]">{shops}+ negozi</strong>
        <span className="text-xs text-slate-500">confrontati in tempo reale</span>
      </Card>
    </section>
  )
}

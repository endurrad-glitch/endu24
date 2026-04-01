export function ResultsHeader({ titleContext, total }: { titleContext: string; total: number }) {
  return (
    <section className="grid gap-1">
      <h1 className="text-2xl font-bold tracking-tight md:text-3xl">Risultati per “{titleContext}”</h1>
      <p className="text-sm text-slate-600">{total} risultati subito disponibili</p>
    </section>
  )
}

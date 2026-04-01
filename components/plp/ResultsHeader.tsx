export function ResultsHeader({ titleContext, total }: { titleContext: string; total: number }) {
  return (
    <section className="results-header">
      <h1>Risultati per “{titleContext}”</h1>
      <p>{total} risultati subito disponibili</p>
    </section>
  )
}

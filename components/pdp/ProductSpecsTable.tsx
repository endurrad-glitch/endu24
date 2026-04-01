export function ProductSpecsTable({ specs }: { specs: Record<string, string> }) {
  return (
    <section className="grid gap-2">
      <h2 className="text-xl font-semibold tracking-tight">Specifiche tecniche</h2>
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="grid grid-cols-2 gap-2 border-t border-slate-100 p-3 first:border-t-0">
            <span className="text-sm text-slate-500">{key}</span><strong className="text-sm text-slate-800">{value}</strong>
          </div>
        ))}
      </div>
    </section>
  )
}

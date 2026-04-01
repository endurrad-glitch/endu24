export function ProductSpecsTable({ specs }: { specs: Record<string, string> }) {
  return (
    <section>
      <h2>Specifiche tecniche</h2>
      <div className="specs-table">
        {Object.entries(specs).map(([key, value]) => (
          <div key={key} className="spec-row"><span>{key}</span><strong>{value}</strong></div>
        ))}
      </div>
    </section>
  )
}

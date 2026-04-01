export default function ProductSpecsTable({
  specs,
  fallback,
}: {
  specs: Record<string, string>
  fallback: { brand: string; category: string; type: string }
}) {
  const rows = Object.entries(specs)
  if (rows.length === 0) {
    rows.push(['Brand', fallback.brand], ['Categoria', fallback.category], ['Tipologia', fallback.type])
  }

  return (
    <table>
      <tbody>
        {rows.map(([label, value]) => (
          <tr key={label}><th>{label}</th><td>{value}</td></tr>
        ))}
      </tbody>
    </table>
  )
}

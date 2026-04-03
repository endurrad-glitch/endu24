'use client'

import { useMemo, useState } from 'react'
import { ImportButton } from '@/components/admin/ImportButton'

export default function AdminImportPage() {
  const [rawRows, setRawRows] = useState('')
  const [isImporting, setIsImporting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  const rows = useMemo(
    () => rawRows.split('\n').map((row) => row.trim()).filter(Boolean),
    [rawRows]
  )

  async function handleImport() {
    setIsImporting(true)
    setMessage(null)

    await new Promise((resolve) => setTimeout(resolve, 600))
    setMessage(`Import completato: ${rows.length} righe pronte per l'elaborazione.`)
    setIsImporting(false)
  }

  return (
    <div className="space-y-4 rounded-xl border border-slate-200 bg-white p-6">
      <div>
        <h2 className="text-lg font-semibold">Import catalogo</h2>
        <p className="text-sm text-slate-500">
          Incolla una riga per ogni record da importare.
        </p>
      </div>

      <textarea
        value={rawRows}
        onChange={(event) => setRawRows(event.target.value)}
        placeholder="SKU-001;Prodotto Demo"
        className="min-h-40 w-full rounded-md border border-slate-300 px-3 py-2 text-sm outline-none ring-0 focus:border-[#ff580d]"
      />

      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-600">Righe valide: {rows.length}</p>
        <ImportButton onClick={handleImport} disabled={rows.length === 0 || isImporting} />
      </div>

      {message ? <p className="text-sm text-emerald-600">{message}</p> : null}
    </div>
  )
}

'use client'

import Image from 'next/image'
import { useActionState, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { saveBrandingAction } from '@/app/admin/logo/actions'

type Props = {
  siteName: string
  logoUrl: string
}

const initialState = { error: '', success: false }

export default function LogoManager({ siteName, logoUrl }: Props) {
  const [preview, setPreview] = useState(logoUrl)
  const [uploading, setUploading] = useState(false)
  const [state, action, pending] = useActionState(saveBrandingAction, initialState)

  async function handleUpload(file: File | null) {
    if (!file) return
    setUploading(true)

    const supabase = createClient()
    const ext = file.name.split('.').pop() || 'png'
    const path = `logos/${Date.now()}.${ext}`

    const { error } = await supabase.storage.from('site-assets').upload(path, file, {
      upsert: true,
      contentType: file.type,
    })

    if (!error) {
      const { data } = supabase.storage.from('site-assets').getPublicUrl(path)
      setPreview(data.publicUrl)
    }

    setUploading(false)
  }

  return (
    <form action={action} className="space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-5">
      <input type="hidden" name="logo_url" value={preview} />

      <div>
        <label className="mb-1 block text-sm text-slate-300">Nome sito</label>
        <input name="site_name" defaultValue={siteName} className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
      </div>

      <div>
        <label className="mb-2 block text-sm text-slate-300">Logo</label>
        <input type="file" accept="image/*" onChange={(e) => handleUpload(e.target.files?.[0] ?? null)} className="block w-full text-sm" />
      </div>

      <div className="rounded-md border border-slate-800 bg-slate-950 p-4">
        <p className="mb-2 text-xs uppercase text-slate-500">Preview</p>
        {preview ? <Image src={preview} alt="Logo preview" width={64} height={64} className="h-16 w-16 rounded object-contain" /> : <p className="text-sm text-slate-400">Nessun logo caricato</p>}
      </div>

      {state?.error ? <p className="text-sm text-rose-400">{state.error}</p> : null}
      {state?.success ? <p className="text-sm text-emerald-400">Salvato con successo.</p> : null}

      <button disabled={pending || uploading} className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium disabled:opacity-60">
        {uploading ? 'Upload in corso...' : pending ? 'Salvataggio...' : 'Salva impostazioni'}
      </button>
    </form>
  )
}

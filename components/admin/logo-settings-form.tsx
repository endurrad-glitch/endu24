'use client'

import { useActionState, useState } from 'react'
import Image from 'next/image'
import { uploadLogoAction, updateSettingsAction, type ActionFeedback } from '@/actions/settings'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const initialState: ActionFeedback = {}

export function LogoSettingsForm({ siteName, logoUrl }: { siteName: string; logoUrl: string | null }) {
  const [settingsState, settingsAction, settingsPending] = useActionState(updateSettingsAction, initialState)
  const [uploadState, uploadAction, uploadPending] = useActionState(async (_: ActionFeedback, formData: FormData) => uploadLogoAction(formData), initialState)
  const [preview, setPreview] = useState<string | null>(logoUrl)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form action={settingsAction} className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold">Site Settings</h3>
        <label className="block text-sm text-slate-600">Site name</label>
        <Input name="site_name" defaultValue={siteName} required />
        {settingsState.error ? <p className="text-sm text-rose-600">{settingsState.error}</p> : null}
        {settingsState.success ? <p className="text-sm text-emerald-600">{settingsState.success}</p> : null}
        <Button type="submit" disabled={settingsPending}>{settingsPending ? 'Saving...' : 'Save settings'}</Button>
      </form>

      <form action={uploadAction} className="space-y-3 rounded-xl border border-slate-200 bg-white p-6">
        <h3 className="text-base font-semibold">Logo Upload</h3>
        <label className="block text-sm text-slate-600">Logo file</label>
        <Input
          name="logo"
          type="file"
          accept="image/*"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0]
            if (file) setPreview(URL.createObjectURL(file))
          }}
        />
        {preview ? <Image src={preview} alt="Logo preview" width={64} height={64} className="rounded" /> : <p className="text-sm text-slate-400">No logo uploaded yet.</p>}
        {uploadState.error ? <p className="text-sm text-rose-600">{uploadState.error}</p> : null}
        {uploadState.success ? <p className="text-sm text-emerald-600">{uploadState.success}</p> : null}
        <Button type="submit" disabled={uploadPending}>{uploadPending ? 'Uploading...' : 'Upload logo'}</Button>
      </form>
    </div>
  )
}

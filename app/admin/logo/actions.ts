'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

type BrandingState = { error: string; success: boolean }

export async function saveBrandingAction(_: BrandingState, formData: FormData): Promise<BrandingState> {
  const siteName = String(formData.get('site_name') || '').trim()
  const logoUrl = String(formData.get('logo_url') || '').trim()

  if (!siteName) {
    return { error: 'Il nome sito è obbligatorio.', success: false }
  }

  const supabase = await createClient()
  const { data: existing } = await supabase.from('settings').select('id').limit(1).maybeSingle<{ id: string }>()

  const payload = {
    site_name: siteName,
    logo_url: logoUrl || null,
    updated_at: new Date().toISOString(),
  }

  const query = existing?.id ? supabase.from('settings').update(payload).eq('id', existing.id) : supabase.from('settings').insert(payload)
  const { error } = await query

  if (error) {
    return { error: 'Salvataggio fallito, riprova.', success: false }
  }

  revalidatePath('/')
  revalidatePath('/admin/logo')
  return { error: '', success: true }
}

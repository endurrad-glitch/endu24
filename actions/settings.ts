'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const settingsSchema = z.object({
  site_name: z.string().min(2).max(60)
})

export type ActionFeedback = { success?: string; error?: string }

export async function updateSettingsAction(_: ActionFeedback, formData: FormData): Promise<ActionFeedback> {
  const site_name = String(formData.get('site_name') ?? '')
  const parsed = settingsSchema.safeParse({ site_name })

  if (!parsed.success) {
    return { error: 'Site name must be between 2 and 60 characters.' }
  }

  const supabase = await createServerSupabaseClient()
  const { data: current } = await supabase.from('settings').select('id').limit(1).maybeSingle()

  const payload = {
    site_name: parsed.data.site_name,
    updated_at: new Date().toISOString()
  }

  const result = current
    ? await supabase.from('settings').update(payload).eq('id', current.id)
    : await supabase.from('settings').insert(payload)

  if (result.error) {
    return { error: result.error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/logo')
  return { success: 'Settings saved.' }
}

export async function uploadLogoAction(formData: FormData): Promise<ActionFeedback> {
  const file = formData.get('logo')

  if (!(file instanceof File) || file.size === 0) {
    return { error: 'Please select a logo file.' }
  }

  const supabase = await createServerSupabaseClient()
  const fileName = `${Date.now()}-${file.name.replace(/\s+/g, '-')}`
  const path = `branding/${fileName}`

  const { error: uploadError } = await supabase.storage.from('site-assets').upload(path, file, {
    cacheControl: '3600',
    upsert: true,
    contentType: file.type
  })

  if (uploadError) {
    return { error: uploadError.message }
  }

  const { data: publicData } = supabase.storage.from('site-assets').getPublicUrl(path)
  const { data: current } = await supabase.from('settings').select('id').limit(1).maybeSingle()
  const payload = {
    logo_url: publicData.publicUrl,
    updated_at: new Date().toISOString()
  }

  const result = current
    ? await supabase.from('settings').update(payload).eq('id', current.id)
    : await supabase.from('settings').insert(payload)

  if (result.error) {
    return { error: result.error.message }
  }

  revalidatePath('/')
  revalidatePath('/admin/logo')
  return { success: 'Logo uploaded successfully.' }
}

'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

function clean(value: FormDataEntryValue | null) {
  return String(value || '').trim()
}

export async function upsertMenuItemAction(formData: FormData) {
  const id = clean(formData.get('id'))
  const label = clean(formData.get('label'))
  const url = clean(formData.get('url'))
  const order = Number(formData.get('order') || 0)
  const isActive = formData.get('is_active') === 'on'

  if (!label || !url) return

  const supabase = await createClient()
  const payload = { label, url, order, is_active: isActive }

  if (id) {
    await supabase.from('menu_items').update(payload).eq('id', id)
  } else {
    await supabase.from('menu_items').insert(payload)
  }

  revalidatePath('/admin/menu')
  revalidatePath('/')
}

export async function deleteMenuItemAction(formData: FormData) {
  const id = clean(formData.get('id'))
  if (!id) return

  const supabase = await createClient()
  await supabase.from('menu_items').delete().eq('id', id)
  revalidatePath('/admin/menu')
  revalidatePath('/')
}

export async function toggleMenuItemAction(formData: FormData) {
  const id = clean(formData.get('id'))
  const isActive = clean(formData.get('is_active')) === 'true'
  if (!id) return

  const supabase = await createClient()
  await supabase.from('menu_items').update({ is_active: !isActive }).eq('id', id)
  revalidatePath('/admin/menu')
  revalidatePath('/')
}

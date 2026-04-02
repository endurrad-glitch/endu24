'use server'

import { revalidatePath } from 'next/cache'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const menuSchema = z.object({
  label: z.string().min(1).max(60),
  url: z.string().min(1).max(200),
  sort_order: z.coerce.number().int().min(0),
  is_active: z.boolean().default(true)
})

export type MenuActionState = { success?: string; error?: string }

export async function createMenuItemAction(_: MenuActionState, formData: FormData): Promise<MenuActionState> {
  const parsed = menuSchema.safeParse({
    label: String(formData.get('label') ?? ''),
    url: String(formData.get('url') ?? ''),
    sort_order: formData.get('sort_order'),
    is_active: formData.get('is_active') === 'on'
  })

  if (!parsed.success) {
    return { error: 'Please fill all fields with valid values.' }
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.from('menu_items').insert(parsed.data)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/menu')
  return { success: 'Menu item created.' }
}

export async function deleteMenuItemAction(id: string) {
  const supabase = await createServerSupabaseClient()
  await supabase.from('menu_items').delete().eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin/menu')
}

export async function toggleMenuItemAction(id: string, current: boolean) {
  const supabase = await createServerSupabaseClient()
  await supabase.from('menu_items').update({ is_active: !current }).eq('id', id)
  revalidatePath('/')
  revalidatePath('/admin/menu')
}

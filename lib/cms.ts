import { cache } from 'react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const defaultSettings = {
  site_name: 'endu24.com',
  logo_url: null as string | null
}

export const getPublicCms = cache(async () => {
  const supabase = await createServerSupabaseClient()

  const [{ data: settings }, { data: menuItems }] = await Promise.all([
    supabase.from('settings').select('site_name, logo_url').limit(1).maybeSingle(),
    supabase
      .from('menu_items')
      .select('id, label, url, sort_order, is_active')
      .eq('is_active', true)
      .order('sort_order', { ascending: true })
  ])

  return {
    settings: settings ?? defaultSettings,
    menuItems: menuItems ?? []
  }
})

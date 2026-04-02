import { cache } from 'react'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import type { Database } from '@/types/database'

type SettingsRow = Pick<Database['public']['Tables']['settings']['Row'], 'site_name' | 'logo_url'>
type MenuItemRow = Pick<
  Database['public']['Tables']['menu_items']['Row'],
  'id' | 'label' | 'url' | 'sort_order' | 'is_active'
>

const defaultSettings: SettingsRow = {
  site_name: 'endu24.com',
  logo_url: null
}

export const getPublicCms = cache(async (): Promise<{ settings: SettingsRow; menuItems: MenuItemRow[] }> => {
  try {
    const supabase = await createServerSupabaseClient()

    const [{ data: settings, error: settingsError }, { data: menuItems, error: menuError }] = await Promise.all([
      supabase.from('settings').select('site_name, logo_url').limit(1).maybeSingle(),
      supabase
        .from('menu_items')
        .select('id, label, url, sort_order, is_active')
        .eq('is_active', true)
        .order('sort_order', { ascending: true })
    ])

    if (settingsError) {
      console.error('Supabase settings query failed:', settingsError.message)
    }

    if (menuError) {
      console.error('Supabase menu_items query failed:', menuError.message)
    }

    return {
      settings: settings ?? defaultSettings,
      menuItems: menuItems ?? []
    }
  } catch (error) {
    console.error('Supabase CMS fetch failed:', error)

    return {
      settings: defaultSettings,
      menuItems: []
    }
  }
})

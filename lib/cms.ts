import { createClient } from '@/lib/supabase/server'

export type SiteSettings = {
  id: string
  logo_url: string | null
  site_name: string | null
}

export type MenuItem = {
  id: string
  label: string
  url: string
  order: number
  is_active: boolean
}

export async function getHeaderData() {
  const supabase = await createClient()

  const [settingsResult, menuResult] = await Promise.all([
    supabase.from('settings').select('id, logo_url, site_name').limit(1).maybeSingle<SiteSettings>(),
    supabase.from('menu_items').select('id, label, url, order, is_active').eq('is_active', true).order('order', { ascending: true }),
  ])

  return {
    settings: settingsResult.data,
    menuItems: (menuResult.data ?? []) as MenuItem[],
  }
}

export async function getAdminMenuItems() {
  const supabase = await createClient()
  const { data } = await supabase.from('menu_items').select('id, label, url, order, is_active').order('order', { ascending: true })
  return (data ?? []) as MenuItem[]
}

export async function getSettings() {
  const supabase = await createClient()
  const { data } = await supabase.from('settings').select('id, logo_url, site_name').limit(1).maybeSingle<SiteSettings>()
  return data
}

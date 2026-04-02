import { MenuManager } from '@/components/admin/menu-manager'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function AdminMenuPage() {
  const supabase = await createServerSupabaseClient()
  const { data } = await supabase.from('menu_items').select('*').order('sort_order', { ascending: true })

  return <MenuManager menuItems={data ?? []} />
}

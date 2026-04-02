import { Card } from '@/components/ui/card'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function AdminDashboardPage() {
  const supabase = await createServerSupabaseClient()

  const [{ count: menuCount }, { count: activeMenuCount }] = await Promise.all([
    supabase.from('menu_items').select('*', { count: 'exact', head: true }),
    supabase.from('menu_items').select('*', { count: 'exact', head: true }).eq('is_active', true)
  ])

  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card title="Navigation links" description="Total links configured in CMS">
        <p className="text-3xl font-semibold">{menuCount ?? 0}</p>
      </Card>
      <Card title="Active links" description="Visible items on public header">
        <p className="text-3xl font-semibold">{activeMenuCount ?? 0}</p>
      </Card>
    </div>
  )
}

import { LogoSettingsForm } from '@/components/admin/logo-settings-form'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default async function AdminLogoPage() {
  const supabase = await createServerSupabaseClient()
  const { data: settings } = await supabase
    .from('settings')
    .select('site_name, logo_url')
    .limit(1)
    .maybeSingle()

  return <LogoSettingsForm siteName={settings?.site_name ?? 'endu24.com'} logoUrl={settings?.logo_url ?? null} />
}

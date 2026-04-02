import { getSettings } from '@/lib/cms'
import LogoManager from '@/components/admin/LogoManager'

export default async function AdminLogoPage() {
  const settings = await getSettings()

  return (
    <section className="space-y-4">
      <h1 className="text-3xl font-semibold">Logo & Branding</h1>
      <LogoManager siteName={settings?.site_name ?? 'endu24.com'} logoUrl={settings?.logo_url ?? ''} />
    </section>
  )
}

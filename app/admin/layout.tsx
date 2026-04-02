import { AdminShell } from '@/components/layout/admin-shell'
import { requireUser } from '@/lib/auth/session'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  await requireUser()
  return <AdminShell>{children}</AdminShell>
}

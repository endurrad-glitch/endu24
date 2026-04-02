import Link from 'next/link'
import { logoutAction } from '@/actions/auth'
import { Button } from '@/components/ui/button'

const links = [
  { href: '/admin', label: 'Dashboard' },
  { href: '/admin/logo', label: 'Branding' },
  { href: '/admin/menu', label: 'Menu' }
]

export function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50">
      <div className="mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 md:grid-cols-[250px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-6">
          <div className="mb-8 text-lg font-semibold">endu24 Admin</div>
          <nav className="space-y-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="block rounded px-3 py-2 text-sm text-slate-700 hover:bg-slate-100">
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>

        <main className="p-6">
          <div className="mb-6 flex items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-3">
            <p className="text-sm text-slate-600">SaaS CMS Control Panel</p>
            <form action={logoutAction}>
              <Button variant="ghost" type="submit">Logout</Button>
            </form>
          </div>
          {children}
        </main>
      </div>
    </div>
  )
}

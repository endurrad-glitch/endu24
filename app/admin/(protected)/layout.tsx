import Link from 'next/link'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { logoutAction } from '@/app/admin/actions/auth'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto grid min-h-screen max-w-7xl grid-cols-1 md:grid-cols-[240px_1fr]">
        <aside className="border-r border-slate-800 bg-slate-900/70 p-6">
          <p className="text-xs uppercase tracking-[0.2em] text-slate-400">Admin</p>
          <h2 className="mt-2 text-xl font-semibold">endu24 CMS</h2>

          <nav className="mt-8 space-y-2">
            <Link href="/admin" className="block rounded-md px-3 py-2 text-sm hover:bg-slate-800">
              Dashboard
            </Link>
            <Link href="/admin/logo" className="block rounded-md px-3 py-2 text-sm hover:bg-slate-800">
              Logo & Branding
            </Link>
            <Link href="/admin/menu" className="block rounded-md px-3 py-2 text-sm hover:bg-slate-800">
              Menu
            </Link>
          </nav>
        </aside>

        <main>
          <header className="flex items-center justify-between border-b border-slate-800 px-6 py-4">
            <p className="text-sm text-slate-300">Accesso come {user.email}</p>
            <form action={logoutAction}>
              <button className="rounded-md border border-slate-700 px-3 py-2 text-sm hover:bg-slate-800">Logout</button>
            </form>
          </header>
          <div className="p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}

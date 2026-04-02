import { createServerSupabaseClient } from '@/lib/supabase/server'

type TestState =
  | { status: 'error'; message: string; style: string }
  | { status: 'empty'; message: string; style: string }
  | { status: 'success'; message: string; style: string }

export default async function SupabaseTestPage() {
  let viewState: TestState = {
    status: 'error',
    message: 'Unexpected error while testing Supabase connection.',
    style: 'border-red-200 bg-red-50 text-red-900'
  }

  try {
    const supabase = await createServerSupabaseClient()
    const { data, error } = await supabase.from('settings').select('site_name, logo_url').limit(1).maybeSingle()

    if (error) {
      console.error('Supabase test query failed:', error.message)
      viewState = {
        status: 'error',
        message: 'Unable to load settings right now. Check server logs for details.',
        style: 'border-amber-300 bg-amber-50 text-amber-900'
      }
    } else if (!data) {
      viewState = {
        status: 'empty',
        message: 'Connected successfully, but no row exists in the settings table yet.',
        style: 'border-slate-200 bg-white text-slate-900'
      }
    } else {
      viewState = {
        status: 'success',
        message: `Connected. Current site name: ${data.site_name}`,
        style: 'border-emerald-200 bg-emerald-50 text-emerald-900'
      }
    }
  } catch (error) {
    console.error('Supabase connection test crashed:', error)
  }

  return (
    <section className={`rounded-lg border p-4 ${viewState.style}`}>
      <h1 className="text-lg font-semibold">Supabase connection test</h1>
      <p className="mt-2">{viewState.message}</p>
    </section>
  )
}

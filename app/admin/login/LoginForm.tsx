'use client'

import { useActionState } from 'react'
import { loginAction } from '@/app/admin/actions/auth'

const initialState = { error: '' }

export default function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState)

  return (
    <form action={action} className="w-full max-w-md space-y-4 rounded-xl border border-slate-800 bg-slate-900 p-8">
      <h1 className="text-2xl font-semibold">Accedi al pannello admin</h1>
      <p className="text-sm text-slate-400">Usa email e password Supabase Auth.</p>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-slate-300">
          Email
        </label>
        <input id="email" name="email" type="email" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-slate-300">
          Password
        </label>
        <input id="password" name="password" type="password" required className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2" />
      </div>

      {state?.error ? <p className="text-sm text-rose-400">{state.error}</p> : null}

      <button disabled={pending} className="w-full rounded-md bg-blue-600 px-4 py-2 font-medium hover:bg-blue-500 disabled:opacity-60">
        {pending ? 'Accesso...' : 'Login'}
      </button>
    </form>
  )
}

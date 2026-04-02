'use client'

import { useActionState } from 'react'
import { loginAction, type AuthState } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const initialState: AuthState = {}

export function LoginForm() {
  const [state, action, pending] = useActionState(loginAction, initialState)

  return (
    <form action={action} className="w-full max-w-md space-y-4 rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
      <h1 className="text-2xl font-semibold">Admin Login</h1>
      <p className="text-sm text-slate-500">Authenticate with Supabase email/password credentials.</p>

      <div>
        <label htmlFor="email" className="mb-1 block text-sm text-slate-700">Email</label>
        <Input id="email" name="email" type="email" required />
      </div>

      <div>
        <label htmlFor="password" className="mb-1 block text-sm text-slate-700">Password</label>
        <Input id="password" name="password" type="password" required minLength={8} />
      </div>

      {state.error ? <p className="text-sm text-rose-600">{state.error}</p> : null}

      <Button type="submit" disabled={pending} className="w-full">
        {pending ? 'Signing in...' : 'Sign in'}
      </Button>
    </form>
  )
}

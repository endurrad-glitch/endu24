'use server'

import { redirect } from 'next/navigation'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase/server'

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export type AuthState = { error?: string }

export async function loginAction(_: AuthState, formData: FormData): Promise<AuthState> {
  const parsed = loginSchema.safeParse({
    email: String(formData.get('email') ?? ''),
    password: String(formData.get('password') ?? '')
  })

  if (!parsed.success) {
    return { error: 'Please provide valid email and password.' }
  }

  const supabase = await createServerSupabaseClient()
  const { error } = await supabase.auth.signInWithPassword(parsed.data)

  if (error) {
    return { error: 'Invalid credentials.' }
  }

  redirect('/admin')
}

export async function logoutAction() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect('/login')
}

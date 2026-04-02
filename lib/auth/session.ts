import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export async function getUser() {
  try {
    const supabase = await createServerSupabaseClient()
    const {
      data: { user },
      error
    } = await supabase.auth.getUser()

    if (error) {
      console.error('Supabase getUser error:', error.message)
      return null
    }

    return user
  } catch (error) {
    console.error('Failed to create server Supabase client:', error)
    return null
  }
}

export async function requireAuth() {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return user
}

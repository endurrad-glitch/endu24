'use client'

import { createBrowserClient } from '@supabase/ssr'
import type { Database } from '@/types/database'
import { getSupabaseEnv } from '@/lib/supabase/env'

let browserClient: ReturnType<typeof createBrowserSupabaseClient> | undefined

export function createBrowserSupabaseClient() {
  const { url, anonKey } = getSupabaseEnv()

  return createBrowserClient<Database>(url, anonKey)
}

export function getBrowserSupabaseClient() {
  browserClient ??= createBrowserSupabaseClient()
  return browserClient
}

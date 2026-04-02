const requiredEnv = {
  url: 'NEXT_PUBLIC_SUPABASE_URL',
  anonKey: 'NEXT_PUBLIC_SUPABASE_ANON_KEY'
} as const

export function getSupabaseEnv() {
  const url = process.env[requiredEnv.url]
  const anonKey = process.env[requiredEnv.anonKey]

  if (!url || !anonKey) {
    throw new Error('Missing Supabase environment variables. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY.')
  }

  return { url, anonKey }
}

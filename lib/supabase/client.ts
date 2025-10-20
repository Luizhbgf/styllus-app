import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.PROD_SUPABASE_NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.PROD_SUPABASE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    "Por favor configure as variáveis de ambiente:\n" + "PROD_SUPABASE_NEXT_PUBLIC_SUPABASE_URL\n" + "PROD_SUPABASE_SUPABASE_ANON_KEY",
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "styllus-auth",
    storage: typeof window !== "undefined" ? window.localStorage : undefined,
  },
})

// Log para debug (remover em produção)
console.log("Supabase URL:", supabaseUrl)
console.log("Supabase Client inicializado")

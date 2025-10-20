import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl) {
  throw new Error("Variável NEXT_PUBLIC_SUPABASE_URL não definida")
}

if (!supabaseAnonKey) {
  throw new Error("Variável NEXT_PUBLIC_SUPABASE_ANON_KEY não definida")
}

console.log("Supabase URL:", supabaseUrl)

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
})

console.log("Supabase Client inicializado")

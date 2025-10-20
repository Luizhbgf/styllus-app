import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

// Verificar se as variáveis de ambiente existem
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL ou Anon Key não configurados. Verifique as variáveis de ambiente.")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

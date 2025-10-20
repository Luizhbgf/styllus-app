import { createClient } from "@supabase/supabase-js"
import type { Database } from "./types"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

if (!supabaseUrl) {
  throw new Error("NEXT_PUBLIC_SUPABASE_URL não está definido nas variáveis de ambiente")
}

if (!supabaseAnonKey) {
  throw new Error("NEXT_PUBLIC_SUPABASE_ANON_KEY não está definido nas variáveis de ambiente")
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
  global: {
    headers: {
      "x-application-name": "styllus",
    },
  },
})

// Função de diagnóstico
export async function testConnection() {
  try {
    const { data, error } = await supabase.from("users").select("count").single()
    if (error) {
      console.error("Erro de conexão com Supabase:", error.message)
      return false
    }
    console.log("✅ Conexão com Supabase OK")
    return true
  } catch (error) {
    console.error("❌ Erro ao conectar com Supabase:", error)
    return false
  }
}

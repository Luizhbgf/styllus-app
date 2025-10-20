import { createClient } from "@supabase/supabase-js"

// Obter variáveis de ambiente
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Validação mais detalhada
if (!supabaseUrl || supabaseUrl === "") {
  console.error("❌ NEXT_PUBLIC_SUPABASE_URL não está configurada!")
  console.error("Configure em: https://vercel.com/seu-projeto/settings/environment-variables")
}

if (!supabaseAnonKey || supabaseAnonKey === "") {
  console.error("❌ NEXT_PUBLIC_SUPABASE_ANON_KEY não está configurada!")
  console.error("Configure em: https://vercel.com/seu-projeto/settings/environment-variables")
}

// Log para debug
console.log("🔧 Supabase Config:", {
  url: supabaseUrl ? "✅ Configurada" : "❌ Faltando",
  key: supabaseAnonKey ? "✅ Configurada" : "❌ Faltando",
})

// Criar cliente do Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
    storageKey: "styllus-auth-token",
  },
  db: {
    schema: "public",
  },
  global: {
    headers: {
      "x-application-name": "styllus-app",
    },
  },
})

// Teste de conexão
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabase.from("users").select("count", { count: "exact", head: true })

    if (error) {
      console.error("❌ Erro ao conectar com Supabase:", error.message)
      return false
    }

    console.log("✅ Conexão com Supabase OK")
    return true
  } catch (error) {
    console.error("❌ Erro ao testar conexão:", error)
    return false
  }
}

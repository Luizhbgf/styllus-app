import { supabase } from "../supabase/client"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  access_level: number
  is_owner: boolean
  user_type: "client" | "professional" | "admin"
  is_active: boolean
  created_at: string
}

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  phone?: string
}

export const authService = {
  async register(data: RegisterData): Promise<{ user: User | null; error: string | null }> {
    try {
      console.log("📝 Iniciando registro para:", data.email)

      // 1. Criar conta no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
            phone: data.phone,
          },
        },
      })

      if (authError) {
        console.error("❌ Erro no registro:", authError)
        return { user: null, error: authError.message }
      }

      if (!authData.user) {
        return { user: null, error: "Falha ao criar conta" }
      }

      console.log("✅ Conta criada no Auth:", authData.user.id)

      // 2. Aguardar trigger criar o usuário na tabela
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 3. Buscar dados completos do usuário
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single()

      if (userError) {
        console.warn("⚠️ Erro ao buscar usuário, usando dados básicos")
        return {
          user: {
            id: authData.user.id,
            email: authData.user.email!,
            name: data.name,
            phone: data.phone,
            access_level: 10,
            is_owner: false,
            user_type: "client",
            is_active: true,
            created_at: new Date().toISOString(),
          },
          error: null,
        }
      }

      console.log("✅ Registro completo!")
      return { user: userData as User, error: null }
    } catch (error: any) {
      console.error("❌ Exceção no registro:", error)
      return { user: null, error: error.message || "Erro ao criar conta" }
    }
  },

  async login(credentials: LoginCredentials): Promise<{ user: User | null; error: string | null }> {
    try {
      console.log("🔐 Iniciando login para:", credentials.email)

      // 1. Fazer login no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (authError) {
        console.error("❌ Erro no login:", authError)
        return { user: null, error: "Email ou senha incorretos" }
      }

      if (!authData.user) {
        return { user: null, error: "Falha ao fazer login" }
      }

      console.log("✅ Login no Auth bem-sucedido")

      // 2. Buscar dados do usuário na tabela
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single()

      if (userError) {
        console.warn("⚠️ Erro ao buscar usuário, usando dados básicos")
        return {
          user: {
            id: authData.user.id,
            email: authData.user.email!,
            name: authData.user.user_metadata?.name || authData.user.email!.split("@")[0],
            phone: authData.user.user_metadata?.phone,
            access_level: 10,
            is_owner: false,
            user_type: "client",
            is_active: true,
            created_at: authData.user.created_at,
          },
          error: null,
        }
      }

      console.log("✅ Login completo!")
      return { user: userData as User, error: null }
    } catch (error: any) {
      console.error("❌ Exceção no login:", error)
      return { user: null, error: error.message || "Erro ao fazer login" }
    }
  },

  async logout(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      return { error: error ? error.message : null }
    } catch (error: any) {
      return { error: error.message || "Erro ao fazer logout" }
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) return null

      const { data: userData, error } = await supabase.from("users").select("*").eq("id", authUser.id).single()

      if (error) return null

      return userData as User
    } catch (error) {
      return null
    }
  },
}

export function canModifyUser(currentUserLevel: number, currentUserIsOwner: boolean, targetUserLevel: number): boolean {
  if (currentUserIsOwner) return true
  return currentUserLevel > targetUserLevel
}

export function getAccessLevelName(level: number): string {
  const levels: Record<number, string> = {
    10: "Cliente",
    20: "Staff",
    30: "Admin",
  }
  return levels[level] || "Desconhecido"
}

export function getRedirectPath(accessLevel: number): string {
  if (accessLevel >= 30) return "/admin/dashboard"
  if (accessLevel >= 20) return "/staff/dashboard"
  return "/cliente/dashboard"
}

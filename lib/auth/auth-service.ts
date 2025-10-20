import { supabase } from "../supabase/client"

export interface User {
  id: string
  email: string
  name: string
  phone?: string
  access_level: "client" | "staff" | "admin" | "owner"
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
      console.log("Iniciando registro:", data.email)

      // 1. Criar usuário no Supabase Auth
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
        console.error("Erro ao criar autenticação:", authError)
        return { user: null, error: authError.message }
      }

      if (!authData.user) {
        return { user: null, error: "Falha ao criar usuário" }
      }

      console.log("Usuário criado no Auth:", authData.user.id)

      // 2. Aguardar um pouco para o trigger criar o registro na tabela users
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // 3. Buscar dados completos do usuário
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single()

      if (userError) {
        console.error("Erro ao buscar dados do usuário:", userError)
        // Mesmo com erro, retornar dados básicos
        return {
          user: {
            id: authData.user.id,
            email: authData.user.email!,
            name: data.name,
            phone: data.phone,
            access_level: "client",
            created_at: new Date().toISOString(),
          },
          error: null,
        }
      }

      console.log("Registro completo com sucesso")
      return { user: userData as User, error: null }
    } catch (error: any) {
      console.error("Erro no registro:", error)
      return { user: null, error: error.message || "Erro ao cadastrar usuário" }
    }
  },

  async login(credentials: LoginCredentials): Promise<{ user: User | null; error: string | null }> {
    try {
      console.log("Iniciando login:", credentials.email)

      // 1. Fazer login no Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
        email: credentials.email,
        password: credentials.password,
      })

      if (authError) {
        console.error("Erro ao fazer login:", authError)
        return { user: null, error: "Email ou senha incorretos" }
      }

      if (!authData.user) {
        return { user: null, error: "Falha ao fazer login" }
      }

      console.log("Login no Auth bem-sucedido:", authData.user.id)

      // 2. Buscar dados completos do usuário
      const { data: userData, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", authData.user.id)
        .single()

      if (userError) {
        console.error("Erro ao buscar dados do usuário:", userError)
        // Retornar dados básicos do Auth
        return {
          user: {
            id: authData.user.id,
            email: authData.user.email!,
            name: authData.user.user_metadata?.name || authData.user.email!.split("@")[0],
            phone: authData.user.user_metadata?.phone,
            access_level: "client",
            created_at: authData.user.created_at,
          },
          error: null,
        }
      }

      console.log("Login completo com sucesso")
      return { user: userData as User, error: null }
    } catch (error: any) {
      console.error("Erro no login:", error)
      return { user: null, error: error.message || "Erro ao fazer login" }
    }
  },

  async logout(): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) {
        console.error("Erro ao fazer logout:", error)
        return { error: error.message }
      }
      return { error: null }
    } catch (error: any) {
      console.error("Erro no logout:", error)
      return { error: error.message || "Erro ao fazer logout" }
    }
  },

  async getCurrentUser(): Promise<User | null> {
    try {
      const {
        data: { user: authUser },
      } = await supabase.auth.getUser()

      if (!authUser) {
        return null
      }

      const { data: userData, error } = await supabase.from("users").select("*").eq("id", authUser.id).single()

      if (error) {
        console.error("Erro ao buscar usuário atual:", error)
        return null
      }

      return userData as User
    } catch (error) {
      console.error("Erro ao buscar usuário atual:", error)
      return null
    }
  },
}

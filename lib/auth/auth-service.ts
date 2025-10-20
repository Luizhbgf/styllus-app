import { supabase } from "@/lib/supabase/client"

export interface LoginCredentials {
  email: string
  password: string
}

export interface RegisterData {
  email: string
  password: string
  name: string
  phone: string
}

export interface AuthUser {
  id: string
  email: string
  name: string
  accessLevel: number
  isOwner: boolean
  userType: "client" | "professional" | "admin"
}

export async function login(credentials: LoginCredentials): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    console.log("🔐 Iniciando login:", credentials.email)

    // 1. Autenticar com Supabase
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (authError) {
      console.error("❌ Erro auth:", authError)
      return {
        user: null,
        error: authError.message.includes("Invalid") ? "Email ou senha incorretos" : authError.message,
      }
    }

    if (!authData.user) {
      return { user: null, error: "Erro ao fazer login" }
    }

    console.log("✅ Auth OK:", authData.user.email)

    // 2. Buscar dados do usuário
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single()

    if (userError) {
      console.warn("⚠️ Erro ao buscar user:", userError)
      // Retornar dados básicos do auth
      return {
        user: {
          id: authData.user.id,
          email: authData.user.email || "",
          name: authData.user.user_metadata?.name || "Usuário",
          accessLevel: 10,
          isOwner: false,
          userType: "client",
        },
        error: null,
      }
    }

    console.log("✅ Login completo:", userData.name)

    return {
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        accessLevel: userData.access_level || 10,
        isOwner: userData.is_owner || false,
        userType: userData.user_type || "client",
      },
      error: null,
    }
  } catch (error: any) {
    console.error("❌ Exceção login:", error)
    return { user: null, error: error.message || "Erro ao fazer login" }
  }
}

export async function register(data: RegisterData): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    console.log("📝 Iniciando registro:", data.email)

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
      console.error("❌ Erro registro:", authError)
      return {
        user: null,
        error: authError.message.includes("already") ? "Este email já está cadastrado" : authError.message,
      }
    }

    if (!authData.user) {
      return { user: null, error: "Erro ao criar conta" }
    }

    console.log("✅ Conta criada:", authData.user.email)

    // Aguardar trigger criar tabela users
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // 2. Verificar se foi criado
    const { data: userData } = await supabase.from("users").select("*").eq("id", authData.user.id).single()

    if (!userData) {
      console.warn("⚠️ Usando dados do auth")
      return {
        user: {
          id: authData.user.id,
          email: authData.user.email || "",
          name: data.name,
          accessLevel: 10,
          isOwner: false,
          userType: "client",
        },
        error: null,
      }
    }

    console.log("✅ Registro completo:", userData.name)

    return {
      user: {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        accessLevel: userData.access_level || 10,
        isOwner: userData.is_owner || false,
        userType: userData.user_type || "client",
      },
      error: null,
    }
  } catch (error: any) {
    console.error("❌ Exceção registro:", error)
    return { user: null, error: error.message || "Erro ao criar conta" }
  }
}

export async function logout(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    return { error: error ? "Erro ao fazer logout" : null }
  } catch (error) {
    return { error: "Erro ao fazer logout" }
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()
    if (!authUser) return null

    const { data: userData } = await supabase.from("users").select("*").eq("id", authUser.id).single()

    if (!userData) {
      return {
        id: authUser.id,
        email: authUser.email || "",
        name: authUser.user_metadata?.name || "Usuário",
        accessLevel: 10,
        isOwner: false,
        userType: "client",
      }
    }

    return {
      id: userData.id,
      email: userData.email,
      name: userData.name,
      accessLevel: userData.access_level || 10,
      isOwner: userData.is_owner || false,
      userType: userData.user_type || "client",
    }
  } catch (error) {
    return null
  }
}

export function getRedirectPath(accessLevel: number): string {
  if (accessLevel >= 30) return "/admin/dashboard"
  if (accessLevel >= 20) return "/staff/dashboard"
  return "/cliente/dashboard"
}

export function canModifyUser(currentUserLevel: number, currentUserIsOwner: boolean, targetUserLevel: number): boolean {
  if (currentUserIsOwner) return true
  return currentUserLevel > targetUserLevel
}

export function getAccessLevelName(level: number): string {
  const levels: Record<number, string> = {
    10: "Cliente",
    20: "Profissional",
    30: "Administrador",
  }
  return levels[level] || "Desconhecido"
}

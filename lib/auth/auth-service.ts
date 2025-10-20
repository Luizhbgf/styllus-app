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
    // 1. Fazer login com Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (authError) {
      console.error("Auth error:", authError)
      return { user: null, error: "Email ou senha incorretos" }
    }

    if (!authData.user) {
      return { user: null, error: "Email ou senha incorretos" }
    }

    // 2. Buscar dados do usuário na tabela users
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single()

    if (userError || !userData) {
      console.error("User data error:", userError)
      return { user: null, error: "Erro ao carregar dados do usuário" }
    }

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
  } catch (error) {
    console.error("Login error:", error)
    return { user: null, error: "Erro ao fazer login. Tente novamente." }
  }
}

export async function register(data: RegisterData): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
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
      console.error("Auth signup error:", authError)

      if (authError.message.includes("already registered")) {
        return { user: null, error: "Este email já está cadastrado" }
      }

      return { user: null, error: authError.message || "Erro ao criar conta" }
    }

    if (!authData.user) {
      return { user: null, error: "Erro ao criar conta. Tente novamente." }
    }

    // 2. Criar registro na tabela users
    const { data: userData, error: userError } = await supabase
      .from("users")
      .insert({
        id: authData.user.id,
        email: data.email,
        name: data.name,
        phone: data.phone,
        user_type: "client",
        access_level: 10,
        is_owner: false,
        is_active: true,
        created_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (userError) {
      console.error("User insert error:", userError)
      // Mesmo com erro no insert, o usuário foi criado no Auth
      // Vamos retornar os dados do Auth
      return {
        user: {
          id: authData.user.id,
          email: data.email,
          name: data.name,
          accessLevel: 10,
          isOwner: false,
          userType: "client",
        },
        error: null,
      }
    }

    // 3. Criar registro de cliente
    await supabase.from("clients").insert({
      user_id: authData.user.id,
      status: "active",
      created_at: new Date().toISOString(),
    })

    return {
      user: {
        id: authData.user.id,
        email: data.email,
        name: data.name,
        accessLevel: 10,
        isOwner: false,
        userType: "client",
      },
      error: null,
    }
  } catch (error) {
    console.error("Register error:", error)
    return { user: null, error: "Erro ao criar conta. Tente novamente." }
  }
}

export async function logout(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Logout error:", error)
      return { error: "Erro ao fazer logout" }
    }
    return { error: null }
  } catch (error) {
    console.error("Logout error:", error)
    return { error: "Erro ao fazer logout" }
  }
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser()

    if (!authUser) {
      return null
    }

    const { data: userData } = await supabase.from("users").select("*").eq("id", authUser.id).single()

    if (!userData) {
      return null
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
    console.error("Get current user error:", error)
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
  if (targetUserLevel >= currentUserLevel) return false
  if (currentUserLevel >= 30 && targetUserLevel < 30) return true
  if (currentUserLevel >= 20 && targetUserLevel < 20) return true
  return false
}

export function getAccessLevelName(level: number): string {
  switch (level) {
    case 10:
      return "Cliente"
    case 20:
      return "Profissional"
    case 30:
      return "Administrador"
    default:
      return "Desconhecido"
  }
}

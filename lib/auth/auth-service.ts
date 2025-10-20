import { supabaseAdmin } from "@/lib/supabase/server"
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
    const { data: users, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", credentials.email)
      .eq("is_active", true)

    if (userError) {
      console.error("Error fetching user:", userError)
      return { user: null, error: "Erro ao buscar usuário" }
    }

    if (!users || users.length === 0) {
      return { user: null, error: "Email ou senha incorretos" }
    }

    const user = users[0]

    // Por enquanto, aceitar qualquer senha para desenvolvimento
    // TODO: Implementar verificação de senha com bcrypt
    const isValidPassword = credentials.password === "123456" || credentials.password.length > 0

    if (!isValidPassword) {
      return { user: null, error: "Email ou senha incorretos" }
    }

    // Atualizar último login
    await supabaseAdmin.from("users").update({ last_login: new Date().toISOString() }).eq("id", user.id)

    return {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        accessLevel: user.access_level,
        isOwner: user.is_owner,
        userType: user.user_type,
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
    // Verificar se email já existe
    const { data: existingUsers, error: checkError } = await supabase.from("users").select("id").eq("email", data.email)

    if (checkError) {
      console.error("Error checking existing user:", checkError)
      return { user: null, error: "Erro ao verificar email" }
    }

    if (existingUsers && existingUsers.length > 0) {
      return { user: null, error: "Este email já está cadastrado" }
    }

    // Criar novo usuário
    const { data: newUser, error: insertError } = await supabase
      .from("users")
      .insert({
        email: data.email,
        name: data.name,
        phone: data.phone,
        user_type: "client",
        access_level: 10,
        is_owner: false,
        is_active: true,
      })
      .select()
      .single()

    if (insertError || !newUser) {
      console.error("Error creating user:", insertError)
      return { user: null, error: "Erro ao criar conta. Tente novamente." }
    }

    // Criar registro de cliente
    const { error: clientError } = await supabase.from("clients").insert({
      user_id: newUser.id,
      status: "active",
    })

    if (clientError) {
      console.error("Error creating client record:", clientError)
    }

    return {
      user: {
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        accessLevel: newUser.access_level,
        isOwner: newUser.is_owner,
        userType: newUser.user_type,
      },
      error: null,
    }
  } catch (error) {
    console.error("Register error:", error)
    return { user: null, error: "Erro ao criar conta. Tente novamente." }
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

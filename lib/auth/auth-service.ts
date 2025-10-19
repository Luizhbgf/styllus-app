import { supabaseAdmin } from "@/lib/supabase/server"
import { supabase } from "@/lib/supabase/client"

export interface LoginCredentials {
  email: string
  password: string
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
    // Buscar usuário pelo email
    const { data: user, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("email", credentials.email)
      .eq("is_active", true)
      .single()

    if (userError || !user) {
      return { user: null, error: "Email ou senha incorretos" }
    }

    // Verificar senha (temporariamente aceitar qualquer senha para desenvolvimento)
    // Em produção, usar: const isValidPassword = await bcrypt.compare(credentials.password, user.password_hash)
    const isValidPassword = true

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

export function getRedirectPath(accessLevel: number): string {
  if (accessLevel >= 30) return "/admin"
  if (accessLevel >= 20) return "/staff/dashboard"
  return "/cliente/dashboard"
}

export function canModifyUser(currentUserLevel: number, currentUserIsOwner: boolean, targetUserLevel: number): boolean {
  // Owner pode modificar qualquer um
  if (currentUserIsOwner) return true

  // Usuários não podem modificar quem tem nível igual ou superior
  if (targetUserLevel >= currentUserLevel) return false

  // Admin (30) pode modificar Staff (20) e Client (10)
  if (currentUserLevel >= 30 && targetUserLevel < 30) return true

  // Staff (20) pode modificar Client (10)
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

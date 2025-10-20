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
    console.log("🔐 Iniciando login para:", credentials.email)

    // 1. Autenticar com Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email: credentials.email,
      password: credentials.password,
    })

    if (authError) {
      console.error("❌ Erro de autenticação:", authError.message)

      if (authError.message.includes("Invalid login credentials")) {
        return { user: null, error: "Email ou senha incorretos" }
      }

      return { user: null, error: authError.message }
    }

    if (!authData.user) {
      console.error("❌ Nenhum usuário retornado após autenticação")
      return { user: null, error: "Erro ao fazer login" }
    }

    console.log("✅ Autenticação bem-sucedida para:", authData.user.email)

    // 2. Buscar dados adicionais do usuário
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single()

    if (userError) {
      console.error("⚠️ Erro ao buscar dados do usuário:", userError.message)
      // Retornar dados mínimos do Auth
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

    console.log("✅ Dados do usuário carregados:", userData.name)

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
    console.error("❌ Exceção no login:", error)
    return { user: null, error: "Erro ao fazer login. Verifique sua conexão com a internet." }
  }
}

export async function register(data: RegisterData): Promise<{ user: AuthUser | null; error: string | null }> {
  try {
    console.log("📝 Iniciando registro para:", data.email)

    // 1. Criar usuário no Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          name: data.name,
          phone: data.phone,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (authError) {
      console.error("❌ Erro no registro:", authError.message)

      if (authError.message.includes("already registered")) {
        return { user: null, error: "Este email já está cadastrado" }
      }

      return { user: null, error: authError.message }
    }

    if (!authData.user) {
      console.error("❌ Nenhum usuário retornado após registro")
      return { user: null, error: "Erro ao criar conta" }
    }

    console.log("✅ Usuário criado no Auth:", authData.user.email)

    // O trigger handle_new_user criará automaticamente o registro em users e clients
    // Aguardar um momento para o trigger executar
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // 2. Verificar se o usuário foi criado na tabela users
    const { data: userData, error: userError } = await supabase
      .from("users")
      .select("*")
      .eq("id", authData.user.id)
      .single()

    if (userError) {
      console.warn("⚠️ Usuário não encontrado na tabela users, usando dados do Auth")
      // Retornar dados mínimos do Auth
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

    console.log("✅ Registro completo para:", userData.name)

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
    console.error("❌ Exceção no registro:", error)
    return { user: null, error: "Erro ao criar conta. Verifique sua conexão com a internet." }
  }
}

export async function logout(): Promise<{ error: string | null }> {
  try {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error("Erro ao fazer logout:", error)
      return { error: "Erro ao fazer logout" }
    }
    return { error: null }
  } catch (error) {
    console.error("Exceção ao fazer logout:", error)
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
    console.error("Erro ao obter usuário atual:", error)
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

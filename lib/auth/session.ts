import type { User } from "./auth-service"

const SESSION_KEY = "styllus_user_session"

export function saveSession(user: User): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  }
}

export function getSession(): User | null {
  if (typeof window === "undefined") {
    return null
  }

  try {
    const session = localStorage.getItem(SESSION_KEY)
    if (!session) return null
    return JSON.parse(session) as User
  } catch (error) {
    console.error("Erro ao ler sessão:", error)
    return null
  }
}

export function clearSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function requireAuth(): User {
  const user = getSession()
  if (!user) {
    if (typeof window !== "undefined") {
      window.location.href = "/login"
    }
    throw new Error("Não autenticado")
  }
  return user
}

export function requireAdmin(): User {
  const user = requireAuth()
  if (user.access_level < 30) {
    if (typeof window !== "undefined") {
      window.location.href = "/cliente/dashboard"
    }
    throw new Error("Acesso negado")
  }
  return user
}

export function requireStaff(): User {
  const user = requireAuth()
  if (user.access_level < 20) {
    if (typeof window !== "undefined") {
      window.location.href = "/cliente/dashboard"
    }
    throw new Error("Acesso negado")
  }
  return user
}

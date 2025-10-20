import type { User } from "./auth-service"

const SESSION_KEY = "styllus_user_session"

export function saveSession(user: User): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(SESSION_KEY, JSON.stringify(user))
    } catch (error) {
      console.error("Erro ao salvar sessão:", error)
    }
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
    try {
      localStorage.removeItem(SESSION_KEY)
    } catch (error) {
      console.error("Erro ao limpar sessão:", error)
    }
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function requireAuth(): User | null {
  const user = getSession()
  if (!user && typeof window !== "undefined") {
    window.location.href = "/login"
  }
  return user
}

export function requireAdmin(): User | null {
  const user = requireAuth()
  if (user && user.access_level < 30 && typeof window !== "undefined") {
    window.location.href = "/cliente/dashboard"
  }
  return user
}

export function requireStaff(): User | null {
  const user = requireAuth()
  if (user && user.access_level < 20 && typeof window !== "undefined") {
    window.location.href = "/cliente/dashboard"
  }
  return user
}

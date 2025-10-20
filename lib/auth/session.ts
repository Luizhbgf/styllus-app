import type { AuthUser } from "./auth-service"

const SESSION_KEY = "styllus_user_session"

export function setSession(user: AuthUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  }
}

export function getSession(): AuthUser | null {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem(SESSION_KEY)
    if (session) {
      try {
        return JSON.parse(session)
      } catch (e) {
        console.error("Erro ao parsear sessão:", e)
        return null
      }
    }
  }
  return null
}

export function clearSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY)
  }
}

"use client"

import type { AuthUser } from "./auth-service"

const SESSION_KEY = "styllus_user"

export function setSession(user: AuthUser): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user))
  }
}

export function getSession(): AuthUser | null {
  if (typeof window !== "undefined") {
    const session = localStorage.getItem(SESSION_KEY)
    return session ? JSON.parse(session) : null
  }
  return null
}

export function clearSession(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(SESSION_KEY)
  }
}

export function isAuthenticated(): boolean {
  return getSession() !== null
}

export function hasAccessLevel(requiredLevel: number): boolean {
  const user = getSession()
  return user ? user.accessLevel >= requiredLevel : false
}

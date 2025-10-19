import { supabaseAdmin } from "@/lib/supabase/server"

export interface User {
  id: string
  email: string
  name: string
  phone: string | null
  avatar_url: string | null
  user_type: "client" | "professional" | "admin"
  access_level: number
  is_owner: boolean
  is_active: boolean
  last_login: string | null
  created_at: string
  updated_at: string
}

export async function getAllUsers() {
  const { data, error } = await supabaseAdmin.from("users").select("*").order("created_at", { ascending: false })

  if (error) throw error
  return data as User[]
}

export async function updateUserAccessLevel(userId: string, newLevel: number, changedBy: string, reason?: string) {
  // Buscar nível antigo
  const { data: oldUser, error: fetchError } = await supabaseAdmin
    .from("users")
    .select("access_level")
    .eq("id", userId)
    .single()

  if (fetchError) throw fetchError

  // Atualizar nível
  const { error: updateError } = await supabaseAdmin
    .from("users")
    .update({
      access_level: newLevel,
      user_type: newLevel === 30 ? "admin" : newLevel === 20 ? "professional" : "client",
      updated_at: new Date().toISOString(),
    })
    .eq("id", userId)

  if (updateError) throw updateError

  // Registrar mudança
  await supabaseAdmin.from("access_level_changes").insert({
    user_id: userId,
    changed_by: changedBy,
    old_level: oldUser.access_level,
    new_level: newLevel,
    reason: reason || null,
  })

  return true
}

export async function toggleUserStatus(userId: string, isActive: boolean) {
  const { error } = await supabaseAdmin.from("users").update({ is_active: isActive }).eq("id", userId)

  if (error) throw error
  return true
}

export async function getUserById(userId: string) {
  const { data, error } = await supabaseAdmin.from("users").select("*").eq("id", userId).single()

  if (error) throw error
  return data as User
}

export async function getAccessLevelChanges(userId: string) {
  const { data, error } = await supabaseAdmin
    .from("access_level_changes")
    .select(
      `
      *,
      changed_by_user:changed_by(name, email)
    `,
    )
    .eq("user_id", userId)
    .order("created_at", { ascending: false })
    .limit(10)

  if (error) throw error
  return data
}

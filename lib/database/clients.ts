import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Client = Database["public"]["Tables"]["clients"]["Row"]
type ClientInsert = Database["public"]["Tables"]["clients"]["Insert"]
type ClientUpdate = Database["public"]["Tables"]["clients"]["Update"]

export async function getClients(filters?: {
  status?: string
  search?: string
}) {
  let query = supabase
    .from("clients")
    .select(`
      *,
      user:users!inner(name, email, phone, avatar_url),
      _count_appointments:appointments(count)
    `)
    .order("created_at", { ascending: false })

  if (filters?.status && filters.status !== "todos") {
    query = query.eq("status", filters.status)
  }

  if (filters?.search) {
    query = query.or(
      `user.name.ilike.%${filters.search}%,user.email.ilike.%${filters.search}%,address.ilike.%${filters.search}%`,
    )
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching clients:", error)
    throw error
  }

  return data
}

export async function getClientById(id: string) {
  const { data, error } = await supabase
    .from("clients")
    .select(`
      *,
      user:users!inner(name, email, phone, avatar_url),
      appointments(*),
      reviews(rating, comment, created_at)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching client:", error)
    throw error
  }

  return data
}

export async function createClient(client: ClientInsert) {
  const { data, error } = await supabase.from("clients").insert(client).select().single()

  if (error) {
    console.error("Error creating client:", error)
    throw error
  }

  return data
}

export async function updateClient(id: string, updates: ClientUpdate) {
  const { data, error } = await supabase.from("clients").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error updating client:", error)
    throw error
  }

  return data
}

export async function deleteClient(id: string) {
  const { error } = await supabase.from("clients").delete().eq("id", id)

  if (error) {
    console.error("Error deleting client:", error)
    throw error
  }
}

export async function getClientStats() {
  // Get total clients
  const { count: totalClients } = await supabase.from("clients").select("*", { count: "exact", head: true })

  // Get active clients
  const { count: activeClients } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("status", "active")

  // Get average ticket
  const { data: clientData } = await supabase.from("clients").select("total_spent, total_services")

  const totalSpent = clientData?.reduce((sum, client) => sum + client.total_spent, 0) || 0
  const averageTicket = totalClients ? totalSpent / totalClients : 0

  return {
    totalClients: totalClients || 0,
    activeClients: activeClients || 0,
    averageTicket: Number(averageTicket.toFixed(0)),
    totalRevenue: totalSpent,
  }
}

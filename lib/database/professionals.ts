import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Professional = Database["public"]["Tables"]["professionals"]["Row"]
type ProfessionalInsert = Database["public"]["Tables"]["professionals"]["Insert"]
type ProfessionalUpdate = Database["public"]["Tables"]["professionals"]["Update"]

export async function getProfessionals(filters?: {
  status?: string
  specialty?: string
  search?: string
}) {
  let query = supabase
    .from("professionals")
    .select(`
      *,
      user:users!inner(name, email, phone, avatar_url),
      services(count),
      _count_appointments:appointments(count)
    `)
    .order("created_at", { ascending: false })

  if (filters?.status && filters.status !== "todos") {
    query = query.eq("status", filters.status)
  }

  if (filters?.specialty) {
    query = query.eq("specialty", filters.specialty)
  }

  if (filters?.search) {
    query = query.or(
      `user.name.ilike.%${filters.search}%,specialty.ilike.%${filters.search}%,user.email.ilike.%${filters.search}%`,
    )
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching professionals:", error)
    throw error
  }

  return data
}

export async function getProfessionalById(id: string) {
  const { data, error } = await supabase
    .from("professionals")
    .select(`
      *,
      user:users!inner(name, email, phone, avatar_url),
      services(*),
      reviews(rating, comment, created_at, client:clients!inner(user:users!inner(name)))
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching professional:", error)
    throw error
  }

  return data
}

export async function createProfessional(professional: ProfessionalInsert) {
  const { data, error } = await supabase.from("professionals").insert(professional).select().single()

  if (error) {
    console.error("Error creating professional:", error)
    throw error
  }

  return data
}

export async function updateProfessional(id: string, updates: ProfessionalUpdate) {
  const { data, error } = await supabase.from("professionals").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error updating professional:", error)
    throw error
  }

  return data
}

export async function deleteProfessional(id: string) {
  const { error } = await supabase.from("professionals").delete().eq("id", id)

  if (error) {
    console.error("Error deleting professional:", error)
    throw error
  }
}

export async function getProfessionalStats() {
  // Get total professionals
  const { count: totalProfessionals } = await supabase.from("professionals").select("*", { count: "exact", head: true })

  // Get active professionals
  const { count: activeProfessionals } = await supabase
    .from("professionals")
    .select("*", { count: "exact", head: true })
    .eq("status", "active")

  // Get average rating
  const { data: ratingData } = await supabase.from("professionals").select("rating").not("rating", "is", null)

  const averageRating = ratingData?.length
    ? ratingData.reduce((sum, prof) => sum + (prof.rating || 0), 0) / ratingData.length
    : 0

  // Get total revenue (from completed appointments)
  const { data: revenueData } = await supabase.from("appointments").select("total_price").eq("status", "completed")

  const totalRevenue = revenueData?.reduce((sum, appointment) => sum + appointment.total_price, 0) || 0

  return {
    totalProfessionals: totalProfessionals || 0,
    activeProfessionals: activeProfessionals || 0,
    averageRating: Number(averageRating.toFixed(1)),
    totalRevenue,
  }
}

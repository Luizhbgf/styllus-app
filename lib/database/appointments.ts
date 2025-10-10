import { supabase } from "@/lib/supabase/client"
import type { Database } from "@/lib/supabase/types"

type Appointment = Database["public"]["Tables"]["appointments"]["Row"]
type AppointmentInsert = Database["public"]["Tables"]["appointments"]["Insert"]
type AppointmentUpdate = Database["public"]["Tables"]["appointments"]["Update"]

export async function getAppointments(filters?: {
  status?: string
  professionalId?: string
  clientId?: string
  dateFrom?: string
  dateTo?: string
}) {
  let query = supabase
    .from("appointments")
    .select(`
      *,
      client:clients!inner(
        id,
        user:users!inner(name, email, phone)
      ),
      professional:professionals!inner(
        id,
        user:users!inner(name, email, phone),
        specialty
      ),
      service:services!inner(name, category, duration_minutes)
    `)
    .order("appointment_date", { ascending: false })

  if (filters?.status && filters.status !== "todos") {
    query = query.eq("status", filters.status)
  }

  if (filters?.professionalId) {
    query = query.eq("professional_id", filters.professionalId)
  }

  if (filters?.clientId) {
    query = query.eq("client_id", filters.clientId)
  }

  if (filters?.dateFrom) {
    query = query.gte("appointment_date", filters.dateFrom)
  }

  if (filters?.dateTo) {
    query = query.lte("appointment_date", filters.dateTo)
  }

  const { data, error } = await query

  if (error) {
    console.error("Error fetching appointments:", error)
    throw error
  }

  return data
}

export async function getAppointmentById(id: string) {
  const { data, error } = await supabase
    .from("appointments")
    .select(`
      *,
      client:clients!inner(
        id,
        user:users!inner(name, email, phone)
      ),
      professional:professionals!inner(
        id,
        user:users!inner(name, email, phone),
        specialty
      ),
      service:services!inner(name, category, duration_minutes, price)
    `)
    .eq("id", id)
    .single()

  if (error) {
    console.error("Error fetching appointment:", error)
    throw error
  }

  return data
}

export async function createAppointment(appointment: AppointmentInsert) {
  const { data, error } = await supabase.from("appointments").insert(appointment).select().single()

  if (error) {
    console.error("Error creating appointment:", error)
    throw error
  }

  return data
}

export async function updateAppointment(id: string, updates: AppointmentUpdate) {
  const { data, error } = await supabase.from("appointments").update(updates).eq("id", id).select().single()

  if (error) {
    console.error("Error updating appointment:", error)
    throw error
  }

  return data
}

export async function deleteAppointment(id: string) {
  const { error } = await supabase.from("appointments").delete().eq("id", id)

  if (error) {
    console.error("Error deleting appointment:", error)
    throw error
  }
}

export async function getAppointmentStats() {
  // Get total appointments
  const { count: totalAppointments } = await supabase.from("appointments").select("*", { count: "exact", head: true })

  // Get appointments today
  const today = new Date().toISOString().split("T")[0]
  const { count: appointmentsToday } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("appointment_date", today)

  // Get total revenue from completed appointments
  const { data: revenueData } = await supabase.from("appointments").select("total_price").eq("status", "completed")

  const totalRevenue = revenueData?.reduce((sum, appointment) => sum + appointment.total_price, 0) || 0

  // Get cancellation rate
  const { count: cancelledAppointments } = await supabase
    .from("appointments")
    .select("*", { count: "exact", head: true })
    .eq("status", "cancelled")

  const cancellationRate = totalAppointments ? ((cancelledAppointments || 0) / totalAppointments) * 100 : 0

  return {
    totalAppointments: totalAppointments || 0,
    appointmentsToday: appointmentsToday || 0,
    totalRevenue,
    cancellationRate: Number(cancellationRate.toFixed(1)),
  }
}

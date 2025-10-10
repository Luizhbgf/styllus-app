export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          name: string
          phone: string | null
          avatar_url: string | null
          user_type: "client" | "professional" | "admin"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          phone?: string | null
          avatar_url?: string | null
          user_type: "client" | "professional" | "admin"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          phone?: string | null
          avatar_url?: string | null
          user_type?: "client" | "professional" | "admin"
          updated_at?: string
        }
      }
      professionals: {
        Row: {
          id: string
          user_id: string
          specialty: string
          bio: string | null
          experience_years: number | null
          rating: number | null
          total_reviews: number
          status: "active" | "inactive" | "pending"
          location: string | null
          instagram: string | null
          facebook: string | null
          linkedin: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          specialty: string
          bio?: string | null
          experience_years?: number | null
          rating?: number | null
          total_reviews?: number
          status?: "active" | "inactive" | "pending"
          location?: string | null
          instagram?: string | null
          facebook?: string | null
          linkedin?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          specialty?: string
          bio?: string | null
          experience_years?: number | null
          rating?: number | null
          total_reviews?: number
          status?: "active" | "inactive" | "pending"
          location?: string | null
          instagram?: string | null
          facebook?: string | null
          linkedin?: string | null
          updated_at?: string
        }
      }
      clients: {
        Row: {
          id: string
          user_id: string
          birth_date: string | null
          gender: string | null
          address: string | null
          preferences: string[] | null
          total_services: number
          total_spent: number
          last_service_date: string | null
          status: "active" | "inactive"
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          birth_date?: string | null
          gender?: string | null
          address?: string | null
          preferences?: string[] | null
          total_services?: number
          total_spent?: number
          last_service_date?: string | null
          status?: "active" | "inactive"
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          birth_date?: string | null
          gender?: string | null
          address?: string | null
          preferences?: string[] | null
          total_services?: number
          total_spent?: number
          last_service_date?: string | null
          status?: "active" | "inactive"
          updated_at?: string
        }
      }
      services: {
        Row: {
          id: string
          name: string
          description: string | null
          category: string
          duration_minutes: number
          price: number
          professional_id: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          category: string
          duration_minutes: number
          price: number
          professional_id: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          category?: string
          duration_minutes?: number
          price?: number
          professional_id?: string
          is_active?: boolean
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          client_id: string
          professional_id: string
          service_id: string
          appointment_date: string
          start_time: string
          end_time: string
          status: "pending" | "confirmed" | "completed" | "cancelled"
          total_price: number
          notes: string | null
          payment_status: "pending" | "paid" | "failed"
          payment_method: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          professional_id: string
          service_id: string
          appointment_date: string
          start_time: string
          end_time: string
          status?: "pending" | "confirmed" | "completed" | "cancelled"
          total_price: number
          notes?: string | null
          payment_status?: "pending" | "paid" | "failed"
          payment_method?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          professional_id?: string
          service_id?: string
          appointment_date?: string
          start_time?: string
          end_time?: string
          status?: "pending" | "confirmed" | "completed" | "cancelled"
          total_price?: number
          notes?: string | null
          payment_status?: "pending" | "paid" | "failed"
          payment_method?: string | null
          updated_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          instructor_id: string
          category: string
          price: number
          duration_hours: number
          total_lessons: number
          level: "beginner" | "intermediate" | "advanced"
          status: "draft" | "active" | "paused"
          thumbnail_url: string | null
          total_students: number
          rating: number | null
          total_reviews: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          instructor_id: string
          category: string
          price: number
          duration_hours: number
          total_lessons: number
          level: "beginner" | "intermediate" | "advanced"
          status?: "draft" | "active" | "paused"
          thumbnail_url?: string | null
          total_students?: number
          rating?: number | null
          total_reviews?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          instructor_id?: string
          category?: string
          price?: number
          duration_hours?: number
          total_lessons?: number
          level?: "beginner" | "intermediate" | "advanced"
          status?: "draft" | "active" | "paused"
          thumbnail_url?: string | null
          total_students?: number
          rating?: number | null
          total_reviews?: number
          updated_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          client_id: string
          professional_id: string | null
          course_id: string | null
          appointment_id: string | null
          rating: number
          comment: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          client_id: string
          professional_id?: string | null
          course_id?: string | null
          appointment_id?: string | null
          rating: number
          comment?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          client_id?: string
          professional_id?: string | null
          course_id?: string | null
          appointment_id?: string | null
          rating?: number
          comment?: string | null
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          sender_id: string
          receiver_id: string
          content: string
          message_type: "text" | "image" | "file"
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          sender_id: string
          receiver_id: string
          content: string
          message_type?: "text" | "image" | "file"
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          message_type?: "text" | "image" | "file"
          is_read?: boolean
          updated_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}

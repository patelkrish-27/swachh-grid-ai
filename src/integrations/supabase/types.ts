export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      alerts: {
        Row: {
          alert_type: string
          bin_id: string | null
          created_at: string | null
          id: string
          message: string
          resolved_at: string | null
          status: string | null
        }
        Insert: {
          alert_type: string
          bin_id?: string | null
          created_at?: string | null
          id?: string
          message: string
          resolved_at?: string | null
          status?: string | null
        }
        Update: {
          alert_type?: string
          bin_id?: string | null
          created_at?: string | null
          id?: string
          message?: string
          resolved_at?: string | null
          status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "alerts_bin_id_fkey"
            columns: ["bin_id"]
            isOneToOne: false
            referencedRelation: "bins"
            referencedColumns: ["id"]
          },
        ]
      }
      bins: {
        Row: {
          battery: number | null
          bin_id: string
          created_at: string | null
          fill_level: number | null
          id: string
          last_updated: string | null
          lat: number | null
          lng: number | null
          location: string
          region: string
          status: string | null
          temperature: number | null
          waste_type: string | null
        }
        Insert: {
          battery?: number | null
          bin_id: string
          created_at?: string | null
          fill_level?: number | null
          id?: string
          last_updated?: string | null
          lat?: number | null
          lng?: number | null
          location: string
          region: string
          status?: string | null
          temperature?: number | null
          waste_type?: string | null
        }
        Update: {
          battery?: number | null
          bin_id?: string
          created_at?: string | null
          fill_level?: number | null
          id?: string
          last_updated?: string | null
          lat?: number | null
          lng?: number | null
          location?: string
          region?: string
          status?: string | null
          temperature?: number | null
          waste_type?: string | null
        }
        Relationships: []
      }
      citizens: {
        Row: {
          area: string | null
          avatar_url: string | null
          created_at: string | null
          id: string
          issues_resolved: number | null
          name: string
          phone: string | null
          points: number | null
          preferences: Json | null
          reports_submitted: number | null
          updated_at: string | null
        }
        Insert: {
          area?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id: string
          issues_resolved?: number | null
          name: string
          phone?: string | null
          points?: number | null
          preferences?: Json | null
          reports_submitted?: number | null
          updated_at?: string | null
        }
        Update: {
          area?: string | null
          avatar_url?: string | null
          created_at?: string | null
          id?: string
          issues_resolved?: number | null
          name?: string
          phone?: string | null
          points?: number | null
          preferences?: Json | null
          reports_submitted?: number | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "citizens_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      reports: {
        Row: {
          citizen_id: string | null
          created_at: string | null
          description: string | null
          id: string
          lat: number | null
          lng: number | null
          location: string
          photo_urls: string[] | null
          points_awarded: number | null
          resolved_at: string | null
          resolved_by: string | null
          severity: string
          status: string | null
          tracking_id: string
          type: string
        }
        Insert: {
          citizen_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          location: string
          photo_urls?: string[] | null
          points_awarded?: number | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity: string
          status?: string | null
          tracking_id: string
          type: string
        }
        Update: {
          citizen_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          lat?: number | null
          lng?: number | null
          location?: string
          photo_urls?: string[] | null
          points_awarded?: number | null
          resolved_at?: string | null
          resolved_by?: string | null
          severity?: string
          status?: string | null
          tracking_id?: string
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "reports_citizen_id_fkey"
            columns: ["citizen_id"]
            isOneToOne: false
            referencedRelation: "citizens"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "reports_resolved_by_fkey"
            columns: ["resolved_by"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      routes: {
        Row: {
          created_at: string | null
          id: string
          optimization_method: string | null
          region: string
          route_data: Json
        }
        Insert: {
          created_at?: string | null
          id?: string
          optimization_method?: string | null
          region: string
          route_data: Json
        }
        Update: {
          created_at?: string | null
          id?: string
          optimization_method?: string | null
          region?: string
          route_data?: Json
        }
        Relationships: []
      }
      urgent_tasks: {
        Row: {
          bin_id: string | null
          completed_at: string | null
          created_at: string | null
          created_by: string | null
          description: string
          id: string
          lat: number | null
          lng: number | null
          priority: string | null
          status: string | null
          task_id: string
          worker_id: string | null
        }
        Insert: {
          bin_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description: string
          id?: string
          lat?: number | null
          lng?: number | null
          priority?: string | null
          status?: string | null
          task_id: string
          worker_id?: string | null
        }
        Update: {
          bin_id?: string | null
          completed_at?: string | null
          created_at?: string | null
          created_by?: string | null
          description?: string
          id?: string
          lat?: number | null
          lng?: number | null
          priority?: string | null
          status?: string | null
          task_id?: string
          worker_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "urgent_tasks_bin_id_fkey"
            columns: ["bin_id"]
            isOneToOne: false
            referencedRelation: "bins"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urgent_tasks_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "urgent_tasks_worker_id_fkey"
            columns: ["worker_id"]
            isOneToOne: false
            referencedRelation: "workers"
            referencedColumns: ["id"]
          },
        ]
      }
      users: {
        Row: {
          created_at: string | null
          email: string
          id: string
          role: string
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          role: string
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          role?: string
        }
        Relationships: []
      }
      workers: {
        Row: {
          assigned_region: string
          contact: string | null
          created_at: string | null
          created_by: string | null
          id: string
          name: string
          status: string | null
          updated_at: string | null
          worker_id: string
        }
        Insert: {
          assigned_region: string
          contact?: string | null
          created_at?: string | null
          created_by?: string | null
          id: string
          name: string
          status?: string | null
          updated_at?: string | null
          worker_id: string
        }
        Update: {
          assigned_region?: string
          contact?: string | null
          created_at?: string | null
          created_by?: string | null
          id?: string
          name?: string
          status?: string | null
          updated_at?: string | null
          worker_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "workers_created_by_fkey"
            columns: ["created_by"]
            isOneToOne: false
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "workers_id_fkey"
            columns: ["id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      generate_task_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      generate_tracking_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
      get_leaderboard: {
        Args: Record<PropertyKey, never>
        Returns: {
          area: string
          issues_resolved: number
          name: string
          points: number
          rank: number
          reports_submitted: number
        }[]
      }
      get_user_role: {
        Args: { user_id: string }
        Returns: string
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const

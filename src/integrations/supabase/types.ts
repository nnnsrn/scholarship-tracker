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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      application_events: {
        Row: {
          completed: boolean
          created_at: string
          date: string
          event_type: string
          id: string
          notes: string | null
          program_id: string | null
          title: string
          user_id: string
        }
        Insert: {
          completed?: boolean
          created_at?: string
          date: string
          event_type?: string
          id?: string
          notes?: string | null
          program_id?: string | null
          title: string
          user_id: string
        }
        Update: {
          completed?: boolean
          created_at?: string
          date?: string
          event_type?: string
          id?: string
          notes?: string | null
          program_id?: string | null
          title?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "application_events_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
      }
      documents: {
        Row: {
          created_at: string
          document_type: string
          file_url: string | null
          id: string
          name: string
          notes: string | null
          status: string
          updated_at: string
          user_id: string
          version: string | null
        }
        Insert: {
          created_at?: string
          document_type?: string
          file_url?: string | null
          id?: string
          name: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id: string
          version?: string | null
        }
        Update: {
          created_at?: string
          document_type?: string
          file_url?: string | null
          id?: string
          name?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string
          version?: string | null
        }
        Relationships: []
      }
      language_tests: {
        Row: {
          certificate_document_id: string | null
          created_at: string
          currency: string | null
          expiry_date: string | null
          id: string
          listening: string | null
          notes: string | null
          price: number | null
          provider: string | null
          reading: string | null
          score: string | null
          speaking: string | null
          test_date: string | null
          test_type: string
          updated_at: string
          user_id: string
          writing: string | null
        }
        Insert: {
          certificate_document_id?: string | null
          created_at?: string
          currency?: string | null
          expiry_date?: string | null
          id?: string
          listening?: string | null
          notes?: string | null
          price?: number | null
          provider?: string | null
          reading?: string | null
          score?: string | null
          speaking?: string | null
          test_date?: string | null
          test_type?: string
          updated_at?: string
          user_id: string
          writing?: string | null
        }
        Update: {
          certificate_document_id?: string | null
          created_at?: string
          currency?: string | null
          expiry_date?: string | null
          id?: string
          listening?: string | null
          notes?: string | null
          price?: number | null
          provider?: string | null
          reading?: string | null
          score?: string | null
          speaking?: string | null
          test_date?: string | null
          test_type?: string
          updated_at?: string
          user_id?: string
          writing?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "language_tests_certificate_document_id_fkey"
            columns: ["certificate_document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
        ]
      }
      programs: {
        Row: {
          application_fee: number | null
          application_link: string | null
          city: string | null
          country: string
          created_at: string
          deadline: string | null
          degree_type: string | null
          funding_type: string | null
          id: string
          major: string
          notes: string | null
          priority: string
          program_link: string | null
          program_name: string
          research_topic: string | null
          scholarship_deadline: string | null
          scholarship_link: string | null
          scholarship_name: string | null
          status: string
          tuition_fee: number | null
          university: string
          updated_at: string
          user_id: string
        }
        Insert: {
          application_fee?: number | null
          application_link?: string | null
          city?: string | null
          country?: string
          created_at?: string
          deadline?: string | null
          degree_type?: string | null
          funding_type?: string | null
          id?: string
          major?: string
          notes?: string | null
          priority?: string
          program_link?: string | null
          program_name: string
          research_topic?: string | null
          scholarship_deadline?: string | null
          scholarship_link?: string | null
          scholarship_name?: string | null
          status?: string
          tuition_fee?: number | null
          university: string
          updated_at?: string
          user_id: string
        }
        Update: {
          application_fee?: number | null
          application_link?: string | null
          city?: string | null
          country?: string
          created_at?: string
          deadline?: string | null
          degree_type?: string | null
          funding_type?: string | null
          id?: string
          major?: string
          notes?: string | null
          priority?: string
          program_link?: string | null
          program_name?: string
          research_topic?: string | null
          scholarship_deadline?: string | null
          scholarship_link?: string | null
          scholarship_name?: string | null
          status?: string
          tuition_fee?: number | null
          university?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      recommendation_requests: {
        Row: {
          created_at: string
          deadline: string | null
          id: string
          notes: string | null
          program_id: string
          received_date: string | null
          recommender_id: string
          requested_date: string | null
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          deadline?: string | null
          id?: string
          notes?: string | null
          program_id: string
          received_date?: string | null
          recommender_id: string
          requested_date?: string | null
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          deadline?: string | null
          id?: string
          notes?: string | null
          program_id?: string
          received_date?: string | null
          recommender_id?: string
          requested_date?: string | null
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "recommendation_requests_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "recommendation_requests_recommender_id_fkey"
            columns: ["recommender_id"]
            isOneToOne: false
            referencedRelation: "recommenders"
            referencedColumns: ["id"]
          },
        ]
      }
      recommenders: {
        Row: {
          affiliation: string | null
          created_at: string
          email: string | null
          id: string
          name: string
          notes: string | null
          position: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          affiliation?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name: string
          notes?: string | null
          position?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          affiliation?: string | null
          created_at?: string
          email?: string | null
          id?: string
          name?: string
          notes?: string | null
          position?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      requirements: {
        Row: {
          category: string
          created_at: string
          deadline: string | null
          document_id: string | null
          id: string
          is_required: boolean
          minimum_score: string | null
          name: string
          notes: string | null
          program_id: string
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          created_at?: string
          deadline?: string | null
          document_id?: string | null
          id?: string
          is_required?: boolean
          minimum_score?: string | null
          name: string
          notes?: string | null
          program_id: string
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          created_at?: string
          deadline?: string | null
          document_id?: string | null
          id?: string
          is_required?: boolean
          minimum_score?: string | null
          name?: string
          notes?: string | null
          program_id?: string
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "requirements_document_id_fkey"
            columns: ["document_id"]
            isOneToOne: false
            referencedRelation: "documents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "requirements_program_id_fkey"
            columns: ["program_id"]
            isOneToOne: false
            referencedRelation: "programs"
            referencedColumns: ["id"]
          },
        ]
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  TableName extends (DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never) = never,
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
  EnumName extends (DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never) = never,
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
  CompositeTypeName extends (PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never) = never,
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

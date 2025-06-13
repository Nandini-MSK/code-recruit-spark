export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      candidates: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string
          experience_years: number | null
          first_name: string
          id: string
          last_name: string
          resume_url: string | null
          skills: string[] | null
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email: string
          experience_years?: number | null
          first_name: string
          id?: string
          last_name: string
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string
          experience_years?: number | null
          first_name?: string
          id?: string
          last_name?: string
          resume_url?: string | null
          skills?: string[] | null
          updated_at?: string
        }
        Relationships: []
      }
      interview_problems: {
        Row: {
          id: string
          interview_id: string | null
          order_index: number
          problem_id: string | null
        }
        Insert: {
          id?: string
          interview_id?: string | null
          order_index?: number
          problem_id?: string | null
        }
        Update: {
          id?: string
          interview_id?: string | null
          order_index?: number
          problem_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "interview_problems_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_problems_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      interview_submissions: {
        Row: {
          code: string
          execution_result: Json | null
          id: string
          interview_id: string | null
          language: string
          problem_id: string | null
          submitted_at: string
          version: number
        }
        Insert: {
          code: string
          execution_result?: Json | null
          id?: string
          interview_id?: string | null
          language: string
          problem_id?: string | null
          submitted_at?: string
          version?: number
        }
        Update: {
          code?: string
          execution_result?: Json | null
          id?: string
          interview_id?: string | null
          language?: string
          problem_id?: string | null
          submitted_at?: string
          version?: number
        }
        Relationships: [
          {
            foreignKeyName: "interview_submissions_interview_id_fkey"
            columns: ["interview_id"]
            isOneToOne: false
            referencedRelation: "interviews"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "interview_submissions_problem_id_fkey"
            columns: ["problem_id"]
            isOneToOne: false
            referencedRelation: "problems"
            referencedColumns: ["id"]
          },
        ]
      }
      interviews: {
        Row: {
          ai_assistance_level:
            | Database["public"]["Enums"]["ai_assistance_level"]
            | null
          candidate_id: string
          created_at: string
          duration_minutes: number
          feedback: Json | null
          id: string
          interview_type: Database["public"]["Enums"]["interview_type"]
          meeting_url: string | null
          notes: string | null
          position_title: string
          recording_enabled: boolean | null
          recruiter_id: string
          scheduled_at: string
          screen_sharing_enabled: boolean | null
          status: Database["public"]["Enums"]["interview_status"]
          updated_at: string
        }
        Insert: {
          ai_assistance_level?:
            | Database["public"]["Enums"]["ai_assistance_level"]
            | null
          candidate_id: string
          created_at?: string
          duration_minutes?: number
          feedback?: Json | null
          id?: string
          interview_type: Database["public"]["Enums"]["interview_type"]
          meeting_url?: string | null
          notes?: string | null
          position_title: string
          recording_enabled?: boolean | null
          recruiter_id: string
          scheduled_at: string
          screen_sharing_enabled?: boolean | null
          status?: Database["public"]["Enums"]["interview_status"]
          updated_at?: string
        }
        Update: {
          ai_assistance_level?:
            | Database["public"]["Enums"]["ai_assistance_level"]
            | null
          candidate_id?: string
          created_at?: string
          duration_minutes?: number
          feedback?: Json | null
          id?: string
          interview_type?: Database["public"]["Enums"]["interview_type"]
          meeting_url?: string | null
          notes?: string | null
          position_title?: string
          recording_enabled?: boolean | null
          recruiter_id?: string
          scheduled_at?: string
          screen_sharing_enabled?: boolean | null
          status?: Database["public"]["Enums"]["interview_status"]
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "interviews_candidate_id_fkey"
            columns: ["candidate_id"]
            isOneToOne: false
            referencedRelation: "candidates"
            referencedColumns: ["id"]
          },
        ]
      }
      problems: {
        Row: {
          constraints: string | null
          created_at: string
          created_by: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id: string
          sample_input: string | null
          sample_output: string | null
          tags: string[] | null
          test_cases: Json | null
          title: string
        }
        Insert: {
          constraints?: string | null
          created_at?: string
          created_by?: string | null
          description: string
          difficulty: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          sample_input?: string | null
          sample_output?: string | null
          tags?: string[] | null
          test_cases?: Json | null
          title: string
        }
        Update: {
          constraints?: string | null
          created_at?: string
          created_by?: string | null
          description?: string
          difficulty?: Database["public"]["Enums"]["difficulty_level"]
          id?: string
          sample_input?: string | null
          sample_output?: string | null
          tags?: string[] | null
          test_cases?: Json | null
          title?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          first_name: string | null
          id: string
          last_name: string | null
          role: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id: string
          last_name?: string | null
          role?: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          first_name?: string | null
          id?: string
          last_name?: string | null
          role?: string
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      ai_assistance_level: "none" | "basic" | "advanced"
      difficulty_level: "easy" | "medium" | "hard"
      interview_status: "scheduled" | "active" | "completed" | "cancelled"
      interview_type: "technical" | "behavioral" | "mixed"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ai_assistance_level: ["none", "basic", "advanced"],
      difficulty_level: ["easy", "medium", "hard"],
      interview_status: ["scheduled", "active", "completed", "cancelled"],
      interview_type: ["technical", "behavioral", "mixed"],
    },
  },
} as const

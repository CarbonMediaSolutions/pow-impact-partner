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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      analyses: {
        Row: {
          category: string
          content: Json
          content_zh: Json | null
          content_zh_hans: Json | null
          created_at: string
          date: string | null
          featured: boolean | null
          id: string
          pdf_url: string | null
          summary: string
          summary_zh: string | null
          summary_zh_hans: string | null
          title: string
          title_zh: string | null
          title_zh_hans: string | null
          updated_at: string
        }
        Insert: {
          category: string
          content?: Json
          content_zh?: Json | null
          content_zh_hans?: Json | null
          created_at?: string
          date?: string | null
          featured?: boolean | null
          id?: string
          pdf_url?: string | null
          summary: string
          summary_zh?: string | null
          summary_zh_hans?: string | null
          title: string
          title_zh?: string | null
          title_zh_hans?: string | null
          updated_at?: string
        }
        Update: {
          category?: string
          content?: Json
          content_zh?: Json | null
          content_zh_hans?: Json | null
          created_at?: string
          date?: string | null
          featured?: boolean | null
          id?: string
          pdf_url?: string | null
          summary?: string
          summary_zh?: string | null
          summary_zh_hans?: string | null
          title?: string
          title_zh?: string | null
          title_zh_hans?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      consultation_leads: {
        Row: {
          created_at: string
          desired_outcome: string | null
          email: string
          id: string
          name: string
          organisation: string | null
          problem_statement: string
          role: string | null
          status: string
          website_linkedin: string | null
        }
        Insert: {
          created_at?: string
          desired_outcome?: string | null
          email: string
          id?: string
          name: string
          organisation?: string | null
          problem_statement: string
          role?: string | null
          status?: string
          website_linkedin?: string | null
        }
        Update: {
          created_at?: string
          desired_outcome?: string | null
          email?: string
          id?: string
          name?: string
          organisation?: string | null
          problem_statement?: string
          role?: string | null
          status?: string
          website_linkedin?: string | null
        }
        Relationships: []
      }
      email_captures: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string | null
          source: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name?: string | null
          source: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string | null
          source?: string
        }
        Relationships: []
      }
      newsletter_subscribers: {
        Row: {
          email: string
          id: string
          subscribed_at: string
        }
        Insert: {
          email: string
          id?: string
          subscribed_at?: string
        }
        Update: {
          email?: string
          id?: string
          subscribed_at?: string
        }
        Relationships: []
      }
      perspective_submissions: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          organisation: string | null
          perspective_text: string
          topic: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          organisation?: string | null
          perspective_text: string
          topic: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          organisation?: string | null
          perspective_text?: string
          topic?: string
        }
        Relationships: []
      }
      perspectives: {
        Row: {
          content: string[]
          content_zh: string[] | null
          content_zh_hans: string[] | null
          created_at: string
          featured: boolean | null
          id: string
          image: string | null
          summary: string
          summary_zh: string | null
          summary_zh_hans: string | null
          tags: string[] | null
          title: string
          title_zh: string | null
          title_zh_hans: string | null
          topic: string
          updated_at: string
        }
        Insert: {
          content?: string[]
          content_zh?: string[] | null
          content_zh_hans?: string[] | null
          created_at?: string
          featured?: boolean | null
          id?: string
          image?: string | null
          summary: string
          summary_zh?: string | null
          summary_zh_hans?: string | null
          tags?: string[] | null
          title: string
          title_zh?: string | null
          title_zh_hans?: string | null
          topic: string
          updated_at?: string
        }
        Update: {
          content?: string[]
          content_zh?: string[] | null
          content_zh_hans?: string[] | null
          created_at?: string
          featured?: boolean | null
          id?: string
          image?: string | null
          summary?: string
          summary_zh?: string | null
          summary_zh_hans?: string | null
          tags?: string[] | null
          title?: string
          title_zh?: string | null
          title_zh_hans?: string | null
          topic?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_content: {
        Row: {
          id: string
          page: string
          section_key: string
          updated_at: string
          value_en: string
          value_zh: string
          value_zh_hans: string
        }
        Insert: {
          id?: string
          page: string
          section_key: string
          updated_at?: string
          value_en?: string
          value_zh?: string
          value_zh_hans?: string
        }
        Update: {
          id?: string
          page?: string
          section_key?: string
          updated_at?: string
          value_en?: string
          value_zh?: string
          value_zh_hans?: string
        }
        Relationships: []
      }
      team_members: {
        Row: {
          bio: string
          bio_zh_hans: string
          bio_zh_hant: string
          created_at: string
          focus: string
          focus_zh_hans: string
          focus_zh_hant: string
          id: string
          image_url: string | null
          name: string
          name_zh_hans: string
          name_zh_hant: string
          role: string
          role_zh_hans: string
          role_zh_hant: string
          sort_order: number
        }
        Insert: {
          bio?: string
          bio_zh_hans?: string
          bio_zh_hant?: string
          created_at?: string
          focus?: string
          focus_zh_hans?: string
          focus_zh_hant?: string
          id?: string
          image_url?: string | null
          name: string
          name_zh_hans?: string
          name_zh_hant?: string
          role: string
          role_zh_hans?: string
          role_zh_hant?: string
          sort_order?: number
        }
        Update: {
          bio?: string
          bio_zh_hans?: string
          bio_zh_hant?: string
          created_at?: string
          focus?: string
          focus_zh_hans?: string
          focus_zh_hant?: string
          id?: string
          image_url?: string | null
          name?: string
          name_zh_hans?: string
          name_zh_hant?: string
          role?: string
          role_zh_hans?: string
          role_zh_hant?: string
          sort_order?: number
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
    Enums: {
      app_role: ["admin", "user"],
    },
  },
} as const

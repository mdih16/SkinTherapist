
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
      brand: {
        Row: {
          brand_id: number
          brand_name: string
        }
        Insert: {
          brand_id?: number
          brand_name: string
        }
        Update: {
          brand_id?: number
          brand_name?: string
        }
        Relationships: []
      }
      category: {
        Row: {
          category_id: number
          parent_id: number | null
        }
        Insert: {
          category_id?: never
          parent_id?: number | null
        }
        Update: {
          category_id?: never
          parent_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "category_parent_id_fkey"
            columns: ["parent_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["category_id"]
          },
        ]
      }
      ingredient: {
        Row: {
          description: string | null
          ingredient_id: number
          ingredient_name: string
          status: number | null
        }
        Insert: {
          description?: string | null
          ingredient_id?: never
          ingredient_name: string
          status?: number | null
        }
        Update: {
          description?: string | null
          ingredient_id?: never
          ingredient_name?: string
          status?: number | null
        }
        Relationships: []
      }
      product: {
        Row: {
          brand_id: number
          category_id: number | null
          ean: string
          image: string | null
          product_id: number
          product_name: string
        }
        Insert: {
          brand_id: number
          category_id?: number | null
          ean: string
          image?: string | null
          product_id?: never
          product_name: string
        }
        Update: {
          brand_id?: number
          category_id?: number | null
          ean?: string
          image?: string | null
          product_id?: never
          product_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "category"
            referencedColumns: ["category_id"]
          },
          {
            foreignKeyName: "product2_brand_id_fkey"
            columns: ["brand_id"]
            isOneToOne: false
            referencedRelation: "brand"
            referencedColumns: ["brand_id"]
          },
        ]
      }
      productingredient: {
        Row: {
          ingredient_id: number
          order: number | null
          product_id: number
        }
        Insert: {
          ingredient_id: number
          order?: number | null
          product_id: number
        }
        Update: {
          ingredient_id?: number
          order?: number | null
          product_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "productingredient_ingredient_id_fkey"
            columns: ["ingredient_id"]
            isOneToOne: false
            referencedRelation: "ingredient"
            referencedColumns: ["ingredient_id"]
          },
          {
            foreignKeyName: "productingredient_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["product_id"]
          },
        ]
      }
      productskintype: {
        Row: {
          product_id: number
          skintype_id: number
        }
        Insert: {
          product_id: number
          skintype_id: number
        }
        Update: {
          product_id?: number
          skintype_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "productskintype_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "product"
            referencedColumns: ["product_id"]
          },
          {
            foreignKeyName: "productskintype_skintype_id_fkey"
            columns: ["skintype_id"]
            isOneToOne: false
            referencedRelation: "skintype"
            referencedColumns: ["skintype_id"]
          },
        ]
      }
      skintype: {
        Row: {
          label: string
          skintype_id: number
        }
        Insert: {
          label: string
          skintype_id?: never
        }
        Update: {
          label?: string
          skintype_id?: never
        }
        Relationships: []
      }
      user: {
        Row: {
          first_name: string
          gender: number | null
          user_id: string
        }
        Insert: {
          first_name: string
          gender?: number | null
          user_id: string
        }
        Update: {
          first_name?: string
          gender?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
        ]
      }
      userskintype: {
        Row: {
          skintype_id: number
          user_id: string
        }
        Insert: {
          skintype_id: number
          user_id: string
        }
        Update: {
          skintype_id?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_skintype_skintype_id_fkey"
            columns: ["skintype_id"]
            isOneToOne: false
            referencedRelation: "skintype"
            referencedColumns: ["skintype_id"]
          },
          {
            foreignKeyName: "user_skintype_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "user"
            referencedColumns: ["user_id"]
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
      IngredientStatus: "0" | "1" | "2"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

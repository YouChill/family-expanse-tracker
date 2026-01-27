// src/types/database.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      families: {
        Row: {
          id: string
          name: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          created_at?: string
          updated_at?: string
        }
      }
      users: {
        Row: {
          id: string
          email: string
          name: string
          family_id: string | null
          role: 'admin' | 'member'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          name: string
          family_id?: string | null
          role?: 'admin' | 'member'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          family_id?: string | null
          role?: 'admin' | 'member'
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          amount: number
          description: string | null
          category: ExpenseCategory
          expense_date: string
          user_id: string
          family_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          amount: number
          description?: string | null
          category: ExpenseCategory
          expense_date: string
          user_id: string
          family_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          amount?: number
          description?: string | null
          category?: ExpenseCategory
          expense_date?: string
          user_id?: string
          family_id?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

export type ExpenseCategory = 
  | 'food'
  | 'home'
  | 'transport'
  | 'health'
  | 'clothing'
  | 'entertainment'
  | 'education'
  | 'shopping'
  | 'travel'
  | 'other'

export type Expense = Database['public']['Tables']['expenses']['Row']
export type User = Database['public']['Tables']['users']['Row']
export type Family = Database['public']['Tables']['families']['Row']

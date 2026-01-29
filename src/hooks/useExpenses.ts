// src/hooks/useExpenses.ts
'use client'

import { useState, useCallback, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { Expense } from '@/types/database'
import type {
  CreateExpenseInput,
  UpdateExpenseInput,
  FilterExpenseInput,
} from '@/lib/validations/expense'

interface UseExpensesOptions {
  familyId?: string
  autoFetch?: boolean
  initialFilters?: FilterExpenseInput
}

interface ExpensesState {
  expenses: Expense[]
  loading: boolean
  error: Error | null
  totalCount: number
}

export function useExpenses(options: UseExpensesOptions = {}) {
  const { familyId, autoFetch = true, initialFilters } = options

  const [state, setState] = useState<ExpensesState>({
    expenses: [],
    loading: false,
    error: null,
    totalCount: 0,
  })

  const [filters, setFilters] = useState<FilterExpenseInput>(
    initialFilters || {}
  )

  const supabase = createClient()

  // Fetch expenses
  const fetchExpenses = useCallback(
    async (customFilters?: FilterExpenseInput) => {
      if (!familyId) return

      setState((prev) => ({ ...prev, loading: true, error: null }))

      try {
        let query = supabase
          .from('expenses')
          .select('*', { count: 'exact' })
          .eq('family_id', familyId)
          .order('expense_date', { ascending: false })

        const activeFilters = customFilters || filters

        // Apply filters
        if (activeFilters.category) {
          query = query.eq('category', activeFilters.category)
        }

        if (activeFilters.startDate) {
          query = query.gte('expense_date', activeFilters.startDate)
        }

        if (activeFilters.endDate) {
          query = query.lte('expense_date', activeFilters.endDate)
        }

        if (activeFilters.minAmount !== undefined) {
          query = query.gte('amount', activeFilters.minAmount)
        }

        if (activeFilters.maxAmount !== undefined) {
          query = query.lte('amount', activeFilters.maxAmount)
        }

        if (activeFilters.userId) {
          query = query.eq('user_id', activeFilters.userId)
        }

        const { data, error, count } = await query

        if (error) throw error

        setState({
          expenses: data as Expense[],
          loading: false,
          error: null,
          totalCount: count || 0,
        })

        return { success: true, data }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error as Error,
        }))
        return { success: false, error: error as Error }
      }
    },
    [familyId, filters, supabase]
  )

  // Auto-fetch on mount and filter changes
  useEffect(() => {
    if (autoFetch && familyId) {
      fetchExpenses()
    }
  }, [autoFetch, familyId, fetchExpenses])

  // Add expense
  const addExpense = async (input: CreateExpenseInput, userId: string) => {
    if (!familyId) {
      return { success: false, error: new Error('Family ID is required') }
    }

    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert({
          ...input,
          user_id: userId,
          family_id: familyId,
        })
        .select()
        .single()

      if (error) throw error

      // Add to local state
      setState((prev) => ({
        ...prev,
        expenses: [data as Expense, ...prev.expenses],
        loading: false,
        totalCount: prev.totalCount + 1,
      }))

      return { success: true, data: data as Expense }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error as Error,
      }))
      return { success: false, error: error as Error }
    }
  }

  // Update expense
  const updateExpense = async (id: string, input: UpdateExpenseInput) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const { data, error } = await supabase
        .from('expenses')
        .update(input)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      // Update local state
      setState((prev) => ({
        ...prev,
        expenses: prev.expenses.map((exp) =>
          exp.id === id ? (data as Expense) : exp
        ),
        loading: false,
      }))

      return { success: true, data: data as Expense }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error as Error,
      }))
      return { success: false, error: error as Error }
    }
  }

  // Delete expense
  const deleteExpense = async (id: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      const { error } = await supabase.from('expenses').delete().eq('id', id)

      if (error) throw error

      // Remove from local state
      setState((prev) => ({
        ...prev,
        expenses: prev.expenses.filter((exp) => exp.id !== id),
        loading: false,
        totalCount: prev.totalCount - 1,
      }))

      return { success: true }
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: error as Error,
      }))
      return { success: false, error: error as Error }
    }
  }

  // Update filters
  const updateFilters = (newFilters: Partial<FilterExpenseInput>) => {
    setFilters((prev) => ({ ...prev, ...newFilters }))
  }

  // Clear filters
  const clearFilters = () => {
    setFilters({})
  }

  // Get statistics
  const getStats = () => {
    const total = state.expenses.reduce((sum, exp) => sum + exp.amount, 0)
    const count = state.expenses.length
    const average = count > 0 ? total / count : 0

    const byCategory = state.expenses.reduce(
      (acc, exp) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount
        return acc
      },
      {} as Record<string, number>
    )

    return { total, count, average, byCategory }
  }

  return {
    // State
    expenses: state.expenses,
    loading: state.loading,
    error: state.error,
    totalCount: state.totalCount,
    filters,

    // Actions
    fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
    updateFilters,
    clearFilters,

    // Computed
    getStats,
  }
}

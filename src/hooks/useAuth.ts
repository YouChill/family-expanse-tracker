// src/hooks/useAuth.ts
'use client'

import { useEffect, useState, useCallback } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User, Session } from '@supabase/supabase-js'
import type { User as AppUser } from '@/types/database'

interface AuthState {
  user: User | null
  session: Session | null
  appUser: AppUser | null
  loading: boolean
  error: Error | null
}

export function useAuth() {
  const [state, setState] = useState<AuthState>({
    user: null,
    session: null,
    appUser: null,
    loading: true,
    error: null,
  })

  const supabase = createClient()

  // Fetch app user from database
  const fetchAppUser = useCallback(
    async (userId: string) => {
      try {
        const { data, error } = await supabase
          .from('users')
          .select('*')
          .eq('id', userId)
          .single()

        if (error) throw error
        return data as AppUser
      } catch (error) {
        console.error('Error fetching app user:', error)
        return null
      }
    },
    [supabase]
  )

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get current session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) throw error

        if (session?.user) {
          const appUser = await fetchAppUser(session.user.id)
          setState({
            user: session.user,
            session,
            appUser,
            loading: false,
            error: null,
          })
        } else {
          setState({
            user: null,
            session: null,
            appUser: null,
            loading: false,
            error: null,
          })
        }
      } catch (error) {
        setState((prev) => ({
          ...prev,
          loading: false,
          error: error as Error,
        }))
      }
    }

    initAuth()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const appUser = await fetchAppUser(session.user.id)
        setState({
          user: session.user,
          session,
          appUser,
          loading: false,
          error: null,
        })
      } else {
        setState({
          user: null,
          session: null,
          appUser: null,
          loading: false,
          error: null,
        })
      }
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, fetchAppUser])

  // Sign in with email and password
  const signIn = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setState((prev) => ({ ...prev, loading: false, error }))
      return { success: false, error }
    }

    return { success: true, data }
  }

  // Sign up with email, password, and name
  const signUp = async (
    email: string,
    password: string,
    name: string,
    familyName: string
  ) => {
    setState((prev) => ({ ...prev, loading: true, error: null }))

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      })

      if (authError) throw authError
      if (!authData.user) throw new Error('No user returned')

      // 2. Create family
      const { data: familyData, error: familyError } = await supabase
        .from('families')
        .insert({ name: familyName })
        .select()
        .single()

      if (familyError) throw familyError

      // 3. Create app user
      const { error: userError } = await supabase.from('users').insert({
        id: authData.user.id,
        email,
        name,
        family_id: familyData.id,
        role: 'admin',
      })

      if (userError) throw userError

      return { success: true, data: authData }
    } catch (error) {
      setState((prev) => ({ ...prev, loading: false, error: error as Error }))
      return { success: false, error: error as Error }
    }
  }

  // Sign out
  const signOut = async () => {
    setState((prev) => ({ ...prev, loading: true }))
    const { error } = await supabase.auth.signOut()

    if (error) {
      setState((prev) => ({ ...prev, loading: false, error }))
      return { success: false, error }
    }

    return { success: true }
  }

  // Reset password
  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true }
  }

  // Update password
  const updatePassword = async (newPassword: string) => {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    })

    if (error) {
      return { success: false, error }
    }

    return { success: true }
  }

  // Refresh app user data
  const refreshUser = async () => {
    if (state.user) {
      const appUser = await fetchAppUser(state.user.id)
      setState((prev) => ({ ...prev, appUser }))
    }
  }

  return {
    // State
    user: state.user,
    session: state.session,
    appUser: state.appUser,
    loading: state.loading,
    error: state.error,

    // Computed
    isAuthenticated: !!state.user,
    isAdmin: state.appUser?.role === 'admin',

    // Actions
    signIn,
    signUp,
    signOut,
    resetPassword,
    updatePassword,
    refreshUser,
  }
}

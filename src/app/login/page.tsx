// src/app/login/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'
import { Card, CardContent } from '@/components/ui/Card'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, ArrowLeft } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get('redirect') || '/dashboard'
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      })

      if (authError) {
        if (authError.message === 'Invalid login credentials') {
          setError('Nieprawidłowy email lub hasło')
        } else {
          setError(authError.message)
        }
        return
      }

      router.push(redirect)
      router.refresh()
    } catch (err) {
      setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6"
          >
            <ArrowLeft className="h-4 w-4" />
            Powrót do strony głównej
          </Link>
          
          <div className="text-5xl mb-4">💰</div>
          <h1 className="text-3xl font-bold text-gray-900">Witaj ponownie!</h1>
          <p className="mt-2 text-gray-600">
            Zaloguj się do swojego konta
          </p>
        </div>

        {/* Form Card */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {error && (
                <Alert variant="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              <Input
                label="Email"
                type="email"
                placeholder="jan@example.com"
                autoComplete="email"
                leftIcon={<Mail className="h-5 w-5" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <div>
                <Input
                  label="Hasło"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  leftIcon={<Lock className="h-5 w-5" />}
                  error={errors.password?.message}
                  {...register('password')}
                />
                <div className="mt-2 text-right">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Zapomniałeś hasła?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                Zaloguj się
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Nie masz konta?{' '}
                <Link
                  href="/register"
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  Zarejestruj się
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Demo credentials info */}
        <div className="text-center text-sm text-gray-500">
          <p>Demo: demo@example.com / demo123456</p>
        </div>
      </div>
    </div>
  )
}

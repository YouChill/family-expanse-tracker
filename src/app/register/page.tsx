// src/app/register/page.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterInput } from '@/lib/validations/auth'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Alert } from '@/components/ui/Alert'
import { Card, CardContent } from '@/components/ui/Card'
import { createClient } from '@/lib/supabase/client'
import { Mail, Lock, User, Users, ArrowLeft, CheckCircle } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (data: RegisterInput) => {
    setIsLoading(true)
    setError(null)

    try {
      // 1. Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
          data: {
            name: data.name,
          },
        },
      })

      if (authError) {
        if (authError.message.includes('already registered')) {
          setError('Ten email jest już zarejestrowany')
        } else {
          setError(authError.message)
        }
        return
      }

      if (!authData.user) {
        setError('Nie udało się utworzyć konta')
        return
      }

      // 2. Create family
      const { data: familyData, error: familyError } = await supabase
        .from('families')
        .insert({ name: data.familyName })
        .select()
        .single()

      if (familyError) {
        setError('Nie udało się utworzyć rodziny: ' + familyError.message)
        return
      }

      // 3. Create user profile
      const { error: userError } = await supabase.from('users').insert({
        id: authData.user.id,
        email: data.email,
        name: data.name,
        family_id: familyData.id,
        role: 'admin',
      })

      if (userError) {
        setError('Nie udało się utworzyć profilu: ' + userError.message)
        return
      }

      // Success!
      setSuccess(true)
      
      // Redirect after short delay
      setTimeout(() => {
        router.push('/dashboard')
        router.refresh()
      }, 2000)
    } catch (err) {
      setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie.')
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Konto utworzone!
            </h2>
            <p className="text-gray-600 mb-4">
              Za chwilę zostaniesz przekierowany do dashboardu...
            </p>
            <div className="animate-spin rounded-full h-8 w-8 border-4 border-primary-500 border-t-transparent mx-auto" />
          </CardContent>
        </Card>
      </div>
    )
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
          <h1 className="text-3xl font-bold text-gray-900">Utwórz konto</h1>
          <p className="mt-2 text-gray-600">
            Rozpocznij śledzenie wydatków swojej rodziny
          </p>
        </div>

        {/* Form Card */}
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {error && (
                <Alert variant="error" onClose={() => setError(null)}>
                  {error}
                </Alert>
              )}

              <Input
                label="Imię"
                type="text"
                placeholder="Jan"
                autoComplete="name"
                leftIcon={<User className="h-5 w-5" />}
                error={errors.name?.message}
                {...register('name')}
              />

              <Input
                label="Email"
                type="email"
                placeholder="jan@example.com"
                autoComplete="email"
                leftIcon={<Mail className="h-5 w-5" />}
                error={errors.email?.message}
                {...register('email')}
              />

              <Input
                label="Hasło"
                type="password"
                placeholder="Min. 6 znaków"
                autoComplete="new-password"
                leftIcon={<Lock className="h-5 w-5" />}
                hint="Min. 6 znaków, mała litera, wielka litera i cyfra"
                error={errors.password?.message}
                {...register('password')}
              />

              <Input
                label="Potwierdź hasło"
                type="password"
                placeholder="Powtórz hasło"
                autoComplete="new-password"
                leftIcon={<Lock className="h-5 w-5" />}
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />

              <Input
                label="Nazwa rodziny"
                type="text"
                placeholder="np. Kowalscy"
                leftIcon={<Users className="h-5 w-5" />}
                hint="Możesz ją później zmienić w ustawieniach"
                error={errors.familyName?.message}
                {...register('familyName')}
              />

              <Button
                type="submit"
                className="w-full"
                size="lg"
                isLoading={isLoading}
              >
                Utwórz konto
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-gray-600">
                Masz już konto?{' '}
                <Link
                  href="/login"
                  className="font-medium text-primary-600 hover:text-primary-700"
                >
                  Zaloguj się
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Terms notice */}
        <p className="text-center text-xs text-gray-500">
          Rejestrując się, akceptujesz{' '}
          <Link href="/terms" className="underline hover:text-gray-700">
            Regulamin
          </Link>{' '}
          i{' '}
          <Link href="/privacy" className="underline hover:text-gray-700">
            Politykę Prywatności
          </Link>
        </p>
      </div>
    </div>
  )
}

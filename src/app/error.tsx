// src/app/error.tsx
'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/Button'
import { AlertCircle, RefreshCw, Home } from 'lucide-react'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error to console (in production, send to error tracking service)
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="mx-auto w-16 h-16 flex items-center justify-center rounded-full bg-red-100 mb-6">
          <AlertCircle className="w-8 h-8 text-red-600" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Ups! Coś poszło nie tak
        </h1>

        <p className="text-gray-600 mb-6">
          Przepraszamy za niedogodności. Wystąpił nieoczekiwany błąd. Spróbuj
          odświeżyć stronę lub wróć do strony głównej.
        </p>

        {process.env.NODE_ENV === 'development' && (
          <div className="mb-6 p-4 bg-red-50 rounded-lg text-left">
            <p className="text-sm font-medium text-red-800 mb-1">
              Szczegóły błędu:
            </p>
            <p className="text-sm text-red-700 font-mono break-all">
              {error.message}
            </p>
            {error.digest && (
              <p className="text-xs text-red-500 mt-2">
                Digest: {error.digest}
              </p>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={reset}
            variant="primary"
            leftIcon={<RefreshCw className="w-4 h-4" />}
          >
            Spróbuj ponownie
          </Button>

          <Button
            variant="outline"
            leftIcon={<Home className="w-4 h-4" />}
            href="/"
          >
            Strona główna
          </Button>
        </div>

        <p className="mt-8 text-sm text-gray-500">
          Jeśli problem się powtarza, skontaktuj się z administratorem.
        </p>
      </div>
    </div>
  )
}

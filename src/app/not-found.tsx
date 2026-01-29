// src/app/not-found.tsx
'use client'

import { Button } from '@/components/ui/Button'
import { Home, ArrowLeft } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="max-w-md w-full text-center">
        <div className="text-8xl font-bold text-gray-200 mb-4">404</div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Strona nie została znaleziona
        </h1>

        <p className="text-gray-600 mb-8">
          Przepraszamy, ale strona której szukasz nie istnieje lub została
          przeniesiona.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="primary"
            leftIcon={<Home className="w-4 h-4" />}
            href="/"
          >
            Strona główna
          </Button>

          <Button
            variant="outline"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
            onClick={() => window.history.back()}
          >
            Wróć
          </Button>
        </div>
      </div>
    </div>
  )
}

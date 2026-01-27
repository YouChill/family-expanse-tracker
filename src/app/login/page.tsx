import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <div className="text-5xl text-center mb-4">💰</div>
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Zaloguj się do konta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Lub{' '}
            <Link href="/register" className="font-medium text-blue-600 hover:text-blue-500">
              utwórz nowe konto
            </Link>
          </p>
        </div>

        <div className="mt-8 space-y-6 bg-white p-8 rounded-lg shadow-sm border border-gray-200">
          <div className="text-center py-12">
            <div className="text-4xl mb-4">🚧</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Strona w budowie
            </h3>
            <p className="text-gray-600 mb-4">
              Formularz logowania zostanie zaimplementowany w Fazie 2 MVP
            </p>
            <div className="text-sm text-gray-500 space-y-1">
              <p>✅ Struktura projektu gotowa</p>
              <p>✅ Baza danych skonfigurowana</p>
              <p>⏳ Formularz logowania - TODO</p>
              <p>⏳ Integracja z Supabase Auth - TODO</p>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <Link
              href="/"
              className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              ← Powrót do strony głównej
            </Link>
          </div>
        </div>

        <div className="text-center text-xs text-gray-500">
          <p>📚 Zobacz docs/mvp-roadmap.md - Faza 2: Autentykacja</p>
        </div>
      </div>
    </div>
  )
}

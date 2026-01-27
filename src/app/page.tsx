import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8">
      <div className="max-w-2xl w-full text-center space-y-8">
        {/* Logo/Tytuł */}
        <div className="space-y-4">
          <div className="text-6xl mb-4">💰</div>
          <h1 className="text-5xl font-bold text-gray-900">
            Family Expense Tracker
          </h1>
          <p className="text-xl text-gray-600">
            Zarządzaj wydatkami rodzinnymi w jednym miejscu
          </p>
        </div>

        {/* Feature list */}
        <div className="grid md:grid-cols-3 gap-6 py-8">
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-3">📊</div>
            <h3 className="font-semibold text-lg mb-2">Statystyki</h3>
            <p className="text-gray-600 text-sm">
              Zobacz dokładnie na co wydajesz pieniądze
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-3">👨‍👩‍👧‍👦</div>
            <h3 className="font-semibold text-lg mb-2">Rodzinna</h3>
            <p className="text-gray-600 text-sm">
              Wspólna baza dla całej rodziny
            </p>
          </div>
          
          <div className="p-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="text-3xl mb-3">🔒</div>
            <h3 className="font-semibold text-lg mb-2">Bezpieczna</h3>
            <p className="text-gray-600 text-sm">
              Twoje dane są chronione i prywatne
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
          <Link
            href="/register"
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors shadow-sm"
          >
            Zarejestruj się
          </Link>
          <Link
            href="/login"
            className="px-8 py-3 bg-white text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors border border-gray-300"
          >
            Zaloguj się
          </Link>
        </div>

        {/* Status info */}
        <div className="pt-8 border-t border-gray-200">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-full text-sm">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span>Aplikacja działa poprawnie!</span>
          </div>
          
          <div className="mt-4 text-sm text-gray-500">
            <p>✅ Next.js server running</p>
            <p>✅ Tailwind CSS configured</p>
            <p className="mt-2 text-xs">
              Następny krok: Skonfiguruj Supabase i zaimplementuj autentykację
            </p>
          </div>
        </div>

        {/* Tech stack */}
        <div className="pt-8 text-sm text-gray-400">
          <p>Next.js 14 • React • TypeScript • Tailwind CSS • Supabase</p>
        </div>
      </div>
    </div>
  )
}

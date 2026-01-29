// src/app/page.tsx
import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { 
  BarChart3, 
  Users, 
  Shield, 
  Smartphone,
  ArrowRight,
  CheckCircle 
} from 'lucide-react'

const features = [
  {
    icon: BarChart3,
    title: 'Statystyki i wykresy',
    description: 'Zobacz dokładnie na co wydajesz pieniądze dzięki intuicyjnym wykresom i raportom.',
  },
  {
    icon: Users,
    title: 'Dla całej rodziny',
    description: 'Wspólna baza danych dla wszystkich członków rodziny z podziałem na użytkowników.',
  },
  {
    icon: Shield,
    title: 'Bezpieczne dane',
    description: 'Twoje dane są chronione i dostępne tylko dla Twojej rodziny.',
  },
  {
    icon: Smartphone,
    title: 'Działa wszędzie',
    description: 'Responsywny design pozwala korzystać z aplikacji na komputerze, tablecie i telefonie.',
  },
]

const benefits = [
  'Dodawaj wydatki w kilka sekund',
  'Kategoryzuj i filtruj transakcje',
  'Analizuj trendy wydatków',
  'Ustalaj budżety miesięczne',
  'Porównuj wydatki między miesiącami',
  'Eksportuj dane do CSV',
]

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="font-bold text-gray-900">Family Tracker</span>
            </Link>

            <div className="flex items-center gap-4">
              <Link
                href="/login"
                className="text-gray-600 hover:text-gray-900 font-medium"
              >
                Zaloguj się
              </Link>
              <Button href="/register">Rozpocznij za darmo</Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-28">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Kontroluj wydatki{' '}
              <span className="gradient-text">całej rodziny</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-8">
              Proste i intuicyjne narzędzie do śledzenia wydatków rodzinnych.
              Wspólna baza, osobne statystyki, pełna kontrola nad finansami.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                rightIcon={<ArrowRight className="h-5 w-5" />} 
                href="/register"
              >
                Utwórz darmowe konto
              </Button>
              <Button size="lg" variant="outline" href="/login">
                Mam już konto
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob" />
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Wszystko czego potrzebujesz
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Kompletne rozwiązanie do zarządzania finansami rodzinnymi
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="text-center p-6 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary-100 text-primary-600 mb-4">
                  <feature.icon className="h-7 w-7" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Zacznij kontrolować swoje finanse już dziś
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Dołącz do rodzin, które już korzystają z Family Expense Tracker
                i zyskaj pełną kontrolę nad domowym budżetem.
              </p>

              <ul className="space-y-3">
                {benefits.map((benefit) => (
                  <li key={benefit} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-8">
                <Button size="lg" href="/register">
                  Zacznij teraz — za darmo
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
                <div className="space-y-4">
                  {/* Mock expense items */}
                  {[
                    { emoji: '🛒', name: 'Zakupy spożywcze', amount: '247,50 zł', category: 'Jedzenie' },
                    { emoji: '⚡', name: 'Rachunek za prąd', amount: '189,00 zł', category: 'Dom' },
                    { emoji: '🚗', name: 'Paliwo', amount: '320,00 zł', category: 'Transport' },
                    { emoji: '🎬', name: 'Kino', amount: '65,00 zł', category: 'Rozrywka' },
                  ].map((item, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{item.emoji}</span>
                        <div>
                          <p className="font-medium text-gray-900">{item.name}</p>
                          <p className="text-sm text-gray-500">{item.category}</p>
                        </div>
                      </div>
                      <span className="font-semibold text-gray-900">{item.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Gotowy, żeby przejąć kontrolę nad finansami?
          </h2>
          <p className="text-lg text-primary-100 mb-8">
            Załóż darmowe konto w 30 sekund i zacznij śledzić wydatki swojej rodziny.
          </p>
          <Button
            size="lg"
            variant="secondary"
            rightIcon={<ArrowRight className="h-5 w-5" />}
            href="/register"
          >
            Utwórz darmowe konto
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">💰</span>
              <span className="font-bold text-white">Family Expense Tracker</span>
            </div>
            <p className="text-sm">
              © {new Date().getFullYear()} Family Expense Tracker. Wszystkie prawa zastrzeżone.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

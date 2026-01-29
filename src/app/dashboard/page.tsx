// src/app/dashboard/page.tsx
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { 
  Wallet, 
  TrendingUp, 
  PieChart, 
  Users,
  Plus 
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import Link from 'next/link'

export const metadata = {
  title: 'Dashboard | Family Expense Tracker',
  description: 'Przegląd wydatków rodzinnych',
}

// Placeholder stats - będą zastąpione prawdziwymi danymi
const stats = [
  {
    label: 'Wydatki w tym miesiącu',
    value: '0,00 zł',
    icon: Wallet,
    color: 'text-blue-600',
    bgColor: 'bg-blue-100',
  },
  {
    label: 'Średnia dzienna',
    value: '0,00 zł',
    icon: TrendingUp,
    color: 'text-green-600',
    bgColor: 'bg-green-100',
  },
  {
    label: 'Liczba wydatków',
    value: '0',
    icon: PieChart,
    color: 'text-purple-600',
    bgColor: 'bg-purple-100',
  },
  {
    label: 'Członkowie rodziny',
    value: '1',
    icon: Users,
    color: 'text-orange-600',
    bgColor: 'bg-orange-100',
  },
]

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">
            Przegląd wydatków Twojej rodziny
          </p>
        </div>

        <Button leftIcon={<Plus className="h-4 w-4" />}>
          Dodaj wydatek
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label} className="stat-card">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 ${stat.color}`} />
              </div>
              <div>
                <p className="stat-value">{stat.value}</p>
                <p className="stat-label">{stat.label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Wydatki według kategorii</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <PieChart className="h-12 w-12 mx-auto mb-2" />
                <p>Brak danych do wyświetlenia</p>
                <p className="text-sm">Dodaj pierwszy wydatek</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Trend Chart Placeholder */}
        <Card>
          <CardHeader>
            <CardTitle>Trend wydatków</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64 flex items-center justify-center text-gray-400">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-2" />
                <p>Brak danych do wyświetlenia</p>
                <p className="text-sm">Dodaj pierwszy wydatek</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Ostatnie wydatki</CardTitle>
          <Link
            href="/dashboard/expenses"
            className="text-sm text-primary-600 hover:text-primary-700"
          >
            Zobacz wszystkie →
          </Link>
        </CardHeader>
        <CardContent>
          <div className="empty-state py-8">
            <Wallet className="h-12 w-12 empty-state-icon" />
            <h3 className="empty-state-title">Brak wydatków</h3>
            <p className="empty-state-description mb-4">
              Rozpocznij śledzenie wydatków rodzinnych dodając pierwszy wpis.
            </p>
            <Button leftIcon={<Plus className="h-4 w-4" />}>
              Dodaj pierwszy wydatek
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// src/components/features/DashboardNav.tsx
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/Button'
import { Avatar } from '@/components/ui/Avatar'
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Settings,
  Users,
  LogOut,
  Menu,
  X,
  ChevronDown,
} from 'lucide-react'

const navigation = [
  { name: 'Dashboard', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Wydatki', href: '/dashboard/expenses', icon: Receipt },
  { name: 'Statystyki', href: '/dashboard/stats', icon: BarChart3 },
  { name: 'Rodzina', href: '/dashboard/family', icon: Users },
]

export function DashboardNav() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)

  // Placeholder user - będzie zastąpiony prawdziwymi danymi z useAuth
  const user = {
    name: 'Jan Kowalski',
    email: 'jan@example.com',
  }

  const handleSignOut = async () => {
    // TODO: Implementacja wylogowania z useAuth
    console.log('Signing out...')
  }

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex">
            {/* Logo */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 flex-shrink-0"
            >
              <span className="text-2xl">💰</span>
              <span className="font-bold text-gray-900 hidden sm:block">
                Family Tracker
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:ml-8 md:flex md:space-x-1">
              {navigation.map((item) => {
                const isActive = pathname === item.href
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>

          {/* User menu - Desktop */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <div className="relative">
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <Avatar name={user.name} size="sm" />
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                <ChevronDown
                  className={cn(
                    'h-4 w-4 text-gray-400 transition-transform',
                    isUserMenuOpen && 'rotate-180'
                  )}
                />
              </button>

              {/* Dropdown */}
              {isUserMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-20">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user.name}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user.email}
                      </p>
                    </div>

                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      onClick={() => setIsUserMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Ustawienia
                    </Link>

                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Wyloguj się
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="px-4 py-3 space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium',
                    isActive
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-gray-600 hover:bg-gray-100'
                  )}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>

          <div className="border-t border-gray-200 px-4 py-3">
            <div className="flex items-center gap-3 mb-3">
              <Avatar name={user.name} size="md" />
              <div>
                <p className="font-medium text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>

            <div className="space-y-1">
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Settings className="h-5 w-5" />
                Ustawienia
              </Link>

              <button
                onClick={handleSignOut}
                className="flex items-center gap-3 w-full px-3 py-2 rounded-lg text-red-600 hover:bg-red-50"
              >
                <LogOut className="h-5 w-5" />
                Wyloguj się
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}

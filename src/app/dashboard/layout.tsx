// src/app/dashboard/layout.tsx
import { type ReactNode } from 'react'
import { DashboardNav } from '@/components/features/DashboardNav'

interface DashboardLayoutProps {
  children: ReactNode
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardNav />
      <main className="page-container">{children}</main>
    </div>
  )
}

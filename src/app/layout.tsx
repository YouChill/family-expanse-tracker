import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Family Expense Tracker',
  description: 'Zarządzaj wydatkami rodzinnymi w jednym miejscu',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pl">
      <body className="bg-gray-50 antialiased">{children}</body>
    </html>
  )
}

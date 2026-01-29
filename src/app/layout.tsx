// src/app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'latin-ext'],
  display: 'swap',
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: {
    default: 'Family Expense Tracker',
    template: '%s | Family Expense Tracker',
  },
  description: 'Zarządzaj wydatkami rodzinnymi w jednym miejscu. Śledź, analizuj i kontroluj finanse swojej rodziny.',
  keywords: ['wydatki', 'budżet', 'finanse', 'rodzina', 'tracker', 'zarządzanie'],
  authors: [{ name: 'Family Expense Tracker Team' }],
  creator: 'Family Expense Tracker',
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'pl_PL',
    siteName: 'Family Expense Tracker',
    title: 'Family Expense Tracker',
    description: 'Zarządzaj wydatkami rodzinnymi w jednym miejscu',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Family Expense Tracker',
    description: 'Zarządzaj wydatkami rodzinnymi w jednym miejscu',
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0f172a' },
  ],
}

interface RootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pl" className={inter.variable}>
      <body className="min-h-screen bg-gray-50 antialiased">
        {/* Skip to content link for accessibility */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary-600 focus:text-white focus:rounded-lg"
        >
          Przejdź do treści
        </a>

        <div id="main-content">{children}</div>

        {/* Portal for modals */}
        <div id="modal-root" />
      </body>
    </html>
  )
}

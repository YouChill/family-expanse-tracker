/** @type {import('next').NextConfig} */
const nextConfig = {
  // Włącz React Strict Mode dla lepszego developmentu
  reactStrictMode: true,

  // Kompilacja ESLint podczas buildu
  eslint: {
    // Ignoruj ESLint warnings podczas buildu (produkcja)
    // Zmienna środowiskowa pozwala to wyłączyć w CI/CD
    ignoreDuringBuilds: process.env.IGNORE_ESLINT === 'true',
  },

  // TypeScript
  typescript: {
    // Ignoruj błędy TypeScript podczas buildu (nie zalecane!)
    ignoreBuildErrors: false,
  },

  // Obrazy z zewnętrznych źródeł
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
    ],
  },

  // Nagłówki bezpieczeństwa
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ]
  },

  // Eksperymentalne funkcje (opcjonalne)
  experimental: {
    // Optymalizacje pakietów
    optimizePackageImports: ['lucide-react', 'date-fns', 'recharts'],
  },

  // Logowanie (w developmencie)
  logging: {
    fetches: {
      fullUrl: process.env.NODE_ENV === 'development',
    },
  },
}

module.exports = nextConfig

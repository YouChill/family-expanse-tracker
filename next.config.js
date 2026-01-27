/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['supabase.co'], // Dodaj domenę Supabase gdy będziesz używać Storage
  },
}

module.exports = nextConfig

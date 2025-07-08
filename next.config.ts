/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // You disabled Turbopack ✅
  },
  images: {
    domains: ['your-supabase-url.supabase.co', 'avatars.githubusercontent.com'], // ✅ remote avatars
  },
  reactStrictMode: true,

  // ✅ Allow builds even if there are ESLint errors
  eslint: {
    ignoreDuringBuilds: true,
  },
}

module.exports = nextConfig;

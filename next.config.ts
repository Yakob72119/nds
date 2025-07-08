/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    turbo: false, // You disabled Turbopack ✅
  },
  images: {
    domains: ['your-supabase-url.supabase.co', 'avatars.githubusercontent.com'], // ✅ optional if you use remote avatars
  },
  reactStrictMode: true,
}

module.exports = nextConfig;

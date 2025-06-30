/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: [
      'images.unsplash.com',
      'morocco-nomad-safari.com',
      'desert-maroc.com',
      'sudestmaroc.com',
      'www.ksarighnda.com',
      'thumbs.dreamstime.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  // Optimisations pour la production
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  // Configuration pour Vercel
  output: 'standalone',
}

export default nextConfig

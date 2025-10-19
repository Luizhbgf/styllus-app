/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.env.BUILD_MODE === 'mobile' ? 'export' : 'standalone',
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  trailingSlash: true,
  
  // PWA Configuration
  images: {
    domains: ['localhost', 'styllusestetica.com.br'],
    formats: ['image/avif', 'image/webp'],
    unoptimized: process.env.BUILD_MODE === 'mobile',
  },

  // Security headers
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          }
        ]
      }
    ]
  },

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }
    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },

  typescript: {
    ignoreBuildErrors: true,
  },
}

export default nextConfig

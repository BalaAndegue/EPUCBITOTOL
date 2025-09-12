/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  optimizeFonts: false,
  eslint: {
    ignoreDuringBuilds: true,
    domains: ['images.pexels.com', 'i.pinimg.com', 'customworld.onrender.com'],
  },
  images: { unoptimized: true },

  i18n: {
    locales: ['en', 'fr'],
    defaultLocale: 'fr',
  },
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: '*' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, PUT, DELETE, OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type, Authorization' },
        ],
      },
    ]
  },
};

module.exports = nextConfig;

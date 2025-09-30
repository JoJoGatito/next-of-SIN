/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
        pathname: '/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/donate',
        destination: '/',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig

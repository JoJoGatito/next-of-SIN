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
  async headers() {
    const paypalScriptSources = [
      "https://www.paypal.com",
      "https://www.paypalobjects.com",
    ]

    const paypalFrameSources = [
      "https://www.paypal.com",
      "https://*.paypal.com",
    ]

    const paypalConnectSources = [
      "https://www.paypal.com",
      "https://*.paypal.com",
      "https://api-m.paypal.com",
      "https://api-m.sandbox.paypal.com",
    ]

    const directives = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline'" + paypalScriptSources.map((src) => ` ${src}`).join(''),
      "style-src 'self' 'unsafe-inline' https://www.paypalobjects.com",
      "img-src 'self' data: https://www.paypalobjects.com",
      "frame-src 'self'" + paypalFrameSources.map((src) => ` ${src}`).join(''),
      "connect-src 'self'" + paypalConnectSources.map((src) => ` ${src}`).join(''),
      "font-src 'self' data:",
    ]

    const donateCsp = directives.join('; ')

    return [
      {
        source: '/donate',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: donateCsp,
          },
        ],
      },
    ]
  },
}

module.exports = nextConfig

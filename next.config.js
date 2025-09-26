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
    const serializeDirective = (name, values) => `${name} ${values.join(' ')}`

    const donateCsp = [
      serializeDirective('default-src', ["'self'"]),
      serializeDirective('script-src', ["'self'", "'unsafe-inline'", 'https://www.paypal.com', 'https://www.paypalobjects.com']),
      serializeDirective('style-src', ["'self'", "'unsafe-inline'", 'https://www.paypalobjects.com']),
      serializeDirective('img-src', ["'self'", 'data:', 'https://www.paypalobjects.com']),
      serializeDirective('frame-src', ["'self'", 'https://www.paypal.com', 'https://*.paypal.com']),
      serializeDirective('connect-src', [
        "'self'",
        'https://www.paypal.com',
        'https://*.paypal.com',
        'https://api-m.paypal.com',
        'https://api-m.sandbox.paypal.com',
      ]),
      serializeDirective('font-src', ["'self'", 'data:']),
    ].join('; ')

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

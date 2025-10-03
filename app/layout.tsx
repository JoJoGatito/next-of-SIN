import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'
import ChromeGuard from '@/components/ChromeGuard'
import { AriaAnnounceProvider } from '@/components/AriaLiveRegion'
import { FocusProvider, FocusIndicator, SkipLink } from '@/components/FocusManager'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Sunstone Inclusivity Network',
  description: 'Supporting queer, disabled, and BIPOC communities through five inclusive programs: Sunstone Youth Group, Rock & Stone, Dis\'abitch, Cafeteria Collective, and Hue House.',
  keywords: 'inclusivity, LGBTQ+, disability support, BIPOC, community programs, Sunstone',
  openGraph: {
    title: 'Sunstone Inclusivity Network',
    description: 'Supporting queer, disabled, and BIPOC communities',
    url: 'https://sunstoneinclusivity.network',
    siteName: 'SIN',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
        <link
          rel="preload"
          href="/fonts/OpenDyslexic3-Regular.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/OpenDyslexic3-Bold.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col`}>
        <SkipLink href="#main">
          Skip to main content
        </SkipLink>
        <FocusProvider>
          <AriaAnnounceProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <FocusIndicator>
                <ChromeGuard>
                  <Navigation />
                </ChromeGuard>
                <main id="main" className="flex-grow pb-16 md:pb-0 bg-gradient-to-b from-sin-yellow/10 via-sin-orange/10 to-sin-yellow/10 dark:bg-transparent">
                  {children}
                </main>
                <ChromeGuard>
                  <Footer />
                </ChromeGuard>
                {/* Portal mounting point for PeekStrip component */}
                <div
                  id="peek-strip-portal"
                  className="fixed inset-0 z-40 pointer-events-none"
                  style={{
                    zIndex: 40,
                    pointerEvents: 'none'
                  }}
                />
              </FocusIndicator>
            </ThemeProvider>
          </AriaAnnounceProvider>
        </FocusProvider>
      </body>
    </html>
  )
}
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

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
        <a href="#main" className="skip-to-content">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Navigation />
          <main id="main" className="flex-grow">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
'use client'

import { useEffect, useRef, useState } from 'react'

declare global {
  interface Window {
    PayPal?: any
  }
}

export default function DonateButton() {
  const containerRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let isMounted = true
    // Capture current element for cleanup; avoids reading a changed ref in cleanup
    const el = buttonRef.current

    const ensureScript = () =>
      new Promise<void>((resolve, reject) => {
        if (typeof window === 'undefined') return

        if ((window as any).PayPal?.Donation?.Button) {
          resolve()
          return
        }

        const existing = document.querySelector(
          'script[src="https://www.paypalobjects.com/donate/sdk/donate-sdk.js"]'
        ) as HTMLScriptElement | null

        if (existing) {
          const onLoad = () => resolve()
          const onError = () => reject(new Error('PayPal SDK failed to load'))
          existing.addEventListener('load', onLoad, { once: true })
          existing.addEventListener('error', onError, { once: true })

          // If it has likely already loaded previously
          if ((existing as any).dataset.loaded === 'true') resolve()
          return
        }

        const script = document.createElement('script')
        script.src = 'https://www.paypalobjects.com/donate/sdk/donate-sdk.js'
        script.charset = 'UTF-8'
        script.async = true
        script.addEventListener('load', () => {
          ;(script as any).dataset.loaded = 'true'
          resolve()
        })
        script.addEventListener('error', () => reject(new Error('PayPal SDK failed to load')))
        document.body.appendChild(script)
      })

    ensureScript()
      .then(() => {
        if (!isMounted) return
        const PayPal = (window as any).PayPal
        if (PayPal?.Donation?.Button && buttonRef.current) {
          // Clear any previous renders
          buttonRef.current.innerHTML = ''
          console.log('[DonateButton] Attempting to render PayPal button')
          if (document.querySelector('#donate-button')) {
            PayPal.Donation.Button({
              env: 'production',
              hosted_button_id: 'ENKQNZTJ7Q5WG',
              image: {
                src: 'https://www.paypalobjects.com/en_US/i/btn/btn_donate_LG.gif',
                alt: 'Donate with PayPal button',
                title: 'PayPal - The safer, easier way to pay online!',
              },
            })
              .render('#donate-button')
            console.log('[DonateButton] Render attempted on #donate-button')
          } else {
            console.error('[DonateButton] Target element #donate-button not found')
          }
        }
      })
      .catch((err: unknown) => {
        console.error('[DonateButton] PayPal SDK load error', err)
      })

    return () => {
      isMounted = false
      if (el) {
        el.innerHTML = ''
      }
    }
  }, [])

  return (
    <div id="donate-button-container" ref={containerRef} className="inline-block">
      <div id="donate-button" ref={buttonRef} />
      <noscript>
        <a
          href="https://www.paypal.com/donate?hosted_button_id=ENKQNZTJ7Q5WG"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white dark:bg-sin-orange text-sin-orange dark:text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/95 dark:hover:bg-sin-yellow dark:hover:text-gray-900 transition-all hover:scale-105 hover:shadow-xl text-base sm:text-lg inline-block border-2 border-transparent hover:border-white/20 dark:hover:border-white/20"
        >
          Donate with PayPal
        </a>
      </noscript>
    </div>
  )
}
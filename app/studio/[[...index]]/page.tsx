'use client'

import { NextStudio } from 'next-sanity/studio'
import { Suspense } from 'react'
import config from '../../../sanity.config'

export default function StudioPage() {
  return (
    <>
      <style jsx global>{`
        /* Hide any site chrome if present and remove gaps */
        body > footer { display: none !important; }
        nav.fixed { display: none !important; }
        #main { padding-bottom: 0 !important; }

        /* Hide Sanity Studio's internal footer */
        [data-ui="Footer"] {
          display: none !important;
        }

        /* Mobile Optimizations */
        @media (max-width: 768px) {
          /* Increase touch targets for better mobile interaction */
          button, [role="button"], a, input, .cm-editor {
            min-height: 44px !important;
            min-width: 44px !important;
          }

          /* Prevent iOS zoom on input focus */
          input, textarea, select, .cm-editor {
            font-size: 16px !important;
          }

          /* Ensure panels fit mobile screens */
          [data-ui="Pane"] {
            min-width: 100% !important;
            max-width: 100% !important;
          }

          /* Fix potential overflow issues */
          [data-ui="Container"] {
            overflow-x: auto !important;
          }

          /* Improve legibility */
          [data-ui] {
            font-size: 14px !important;
          }
        }
      `}</style>
      <Suspense fallback={<div className="p-4 text-center">Loading Studio...</div>}>
        <NextStudio config={config} />
      </Suspense>
    </>
  )
}
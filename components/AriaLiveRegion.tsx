'use client'

import { useEffect, useState } from 'react'

interface AriaLiveRegionProps {
  message?: string
  politeness?: 'polite' | 'assertive'
  clearAfter?: number // milliseconds to clear the message
}

/**
 * ARIA Live Region component for screen reader announcements
 * Use this to announce dynamic content changes to screen reader users
 */
export function AriaLiveRegion({ 
  message = '', 
  politeness = 'polite',
  clearAfter = 5000
}: AriaLiveRegionProps) {
  const [announcement, setAnnouncement] = useState(message)

  useEffect(() => {
    if (message) {
      setAnnouncement(message)
      
      if (clearAfter > 0) {
        const timer = setTimeout(() => {
          setAnnouncement('')
        }, clearAfter)
        
        return () => clearTimeout(timer)
      }
    }
  }, [message, clearAfter])

  return (
    <div
      role="status"
      aria-live={politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {announcement}
    </div>
  )
}

/**
 * Hook to manage ARIA live announcements
 */
export function useAriaAnnounce() {
  const [message, setMessage] = useState('')

  const announce = (text: string, options?: { 
    politeness?: 'polite' | 'assertive',
    clearAfter?: number 
  }) => {
    // Clear and re-set to ensure screen readers announce even if it's the same message
    setMessage('')
    setTimeout(() => {
      setMessage(text)
    }, 100)
    
    if (options?.clearAfter) {
      setTimeout(() => {
        setMessage('')
      }, options.clearAfter)
    }
  }

  const clear = () => setMessage('')

  return { message, announce, clear }
}
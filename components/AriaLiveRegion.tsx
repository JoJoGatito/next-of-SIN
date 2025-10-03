'use client'

import { useEffect, useState, useCallback, createContext, useContext, ReactNode } from 'react'

export type AriaPoliteness = 'polite' | 'assertive' | 'off'

export type AriaRole = 'status' | 'alert' | 'log'

interface AriaLiveRegionProps {
  message?: string
  politeness?: AriaPoliteness
  role?: AriaRole
  clearAfter?: number // milliseconds to clear the message
  children?: ReactNode
}

/**
 * ARIA Live Region component for screen reader announcements
 * Use this to announce dynamic content changes to screen reader users
 */
export function AriaLiveRegion({
  message = '',
  politeness = 'polite',
  role = 'status',
  clearAfter = 5000,
  children
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

  // Don't render if politeness is 'off' or no message and no children
  if (politeness === 'off' && !children) {
    return null
  }

  return (
    <div
      role={role}
      aria-live={politeness === 'off' ? undefined : politeness}
      aria-atomic="true"
      className="sr-only"
    >
      {children || announcement}
    </div>
  )
}

// Context for global announcements
interface AriaAnnounceContextValue {
  announce: (text: string, options?: {
    politeness?: AriaPoliteness,
    role?: AriaRole,
    clearAfter?: number
  }) => void
  clear: () => void
}

const AriaAnnounceContext = createContext<AriaAnnounceContextValue | null>(null)

interface AriaAnnounceProviderProps {
  children: ReactNode
}

/**
 * Provider for global ARIA announcements
 */
export function AriaAnnounceProvider({ children }: AriaAnnounceProviderProps) {
  const [announcements, setAnnouncements] = useState<Array<{
    id: string
    text: string
    politeness: AriaPoliteness
    role: AriaRole
  }>>([])

  const announce = useCallback((text: string, options?: {
    politeness?: AriaPoliteness,
    role?: AriaRole,
    clearAfter?: number
  }) => {
    const id = Math.random().toString(36).substring(7)
    const announcement = {
      id,
      text,
      politeness: options?.politeness || 'polite',
      role: options?.role || 'status'
    }

    setAnnouncements(prev => [...prev, announcement])

    // Auto-clear after specified time
    if (options?.clearAfter) {
      setTimeout(() => {
        setAnnouncements(prev => prev.filter(a => a.id !== id))
      }, options.clearAfter)
    }
  }, [])

  const clear = useCallback(() => setAnnouncements([]), [])

  return (
    <AriaAnnounceContext.Provider value={{ announce, clear }}>
      {children}
      {announcements.map(({ id, text, politeness, role }) => (
        <AriaLiveRegion
          key={id}
          message={text}
          politeness={politeness}
          role={role}
          clearAfter={0} // Managed by the provider
        />
      ))}
    </AriaAnnounceContext.Provider>
  )
}

/**
 * Hook to use global ARIA announcements
 */
export function useAriaAnnounce() {
  const context = useContext(AriaAnnounceContext)
  if (!context) {
    throw new Error('useAriaAnnounce must be used within an AriaAnnounceProvider')
  }
  return context
}

/**
 * Hook to manage ARIA live announcements for local use
 */
export function useLocalAriaAnnounce() {
  const [message, setMessage] = useState('')
  const [politeness, setPoliteness] = useState<AriaPoliteness>('polite')
  const [role, setRole] = useState<AriaRole>('status')

  const announce = (text: string, options?: {
    politeness?: AriaPoliteness,
    role?: AriaRole,
    clearAfter?: number
  }) => {
    // Clear and re-set to ensure screen readers announce even if it's the same message
    setMessage('')
    setTimeout(() => {
      setMessage(text)
      setPoliteness(options?.politeness || 'polite')
      setRole(options?.role || 'status')
    }, 10)

    if (options?.clearAfter) {
      setTimeout(() => {
        setMessage('')
      }, options.clearAfter)
    }
  }

  const clear = () => setMessage('')

  return { message, politeness, role, announce, clear }
}
'use client'

import { useEffect, useRef, useState } from 'react'
import { X, MapPin, Clock, Users, ExternalLink, Calendar, Tag } from 'lucide-react'
import { EventDTO } from './CalendarMonth'

interface EventDayDrawerProps {
  isOpen: boolean
  onClose: () => void
  events: EventDTO[]
  dayKey: string
  focusReturnElement?: HTMLElement | null
}

export default function EventDayDrawer({
  isOpen,
  onClose,
  events,
  dayKey,
  focusReturnElement
}: EventDayDrawerProps) {
  const drawerRef = useRef<HTMLDivElement>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check if mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Focus trap and keyboard navigation
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
        return
      }

      if (event.key === 'Tab') {
        const focusableElements = drawerRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement>

        if (!focusableElements?.length) return

        const firstElement = focusableElements[0]
        const lastElement = focusableElements[focusableElements.length - 1]

        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement.focus()
          }
        }
      }
    }

    // Focus the drawer when it opens
    const focusTimeout = setTimeout(() => {
      const closeButton = drawerRef.current?.querySelector('[data-close-button]') as HTMLElement
      closeButton?.focus()
    }, 100)

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden' // Prevent background scroll

    return () => {
      clearTimeout(focusTimeout)
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [isOpen, onClose])

  // Return focus to the originating element when closed
  useEffect(() => {
    if (!isOpen && focusReturnElement) {
      focusReturnElement.focus()
    }
  }, [isOpen, focusReturnElement])

  // Don't render if not open
  if (!isOpen) return null

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString)
    return {
      date: date.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      }),
      time: date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    }
  }

  const formatTimeRange = (start: string, end?: string) => {
    const startFormatted = formatDateTime(start)
    if (!end) return startFormatted.time

    const endFormatted = formatDateTime(end)
    return `${startFormatted.time} - ${endFormatted.time}`
  }

  const getProgramCardGradient = (program?: string) => {
    const prog = (program || '').toLowerCase()
    switch (prog) {
      case 'hue house':
      case 'hue-house':
        return 'from-purple-50/50 to-purple-30/30 dark:from-purple-900/50 dark:to-purple-800/30'
      case 'rock and stone':
      case 'rock-and-stone':
        return 'from-yellow-50/50 to-amber-30/30 dark:from-yellow-900/50 dark:to-amber-800/30'
      case 'sunstone youth group':
      case 'sunstone-youth-group':
        return 'from-orange-50/50 to-yellow-30/30 dark:from-orange-900/50 dark:to-yellow-800/30'
      default:
        return 'from-orange-50/50 to-yellow-30/30 dark:from-orange-900/50 dark:to-yellow-800/30'
    }
  }

  const getProgramIconColor = (program?: string) => {
    const prog = (program || '').toLowerCase()
    switch (prog) {
      case 'hue house':
      case 'hue-house':
        return 'text-purple-600 dark:text-purple-400'
      case 'rock and stone':
      case 'rock-and-stone':
        return 'text-yellow-600 dark:text-yellow-400'
      case 'sunstone youth group':
      case 'sunstone-youth-group':
        return 'text-orange-600 dark:text-orange-400'
      default:
        return 'text-orange-600 dark:text-orange-400'
    }
  }

  const getProgramBadgeGradient = (program?: string) => {
    const prog = (program || '').toLowerCase()
    switch (prog) {
      case 'hue house':
      case 'hue-house':
        return 'from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900'
      case 'rock and stone':
      case 'rock-and-stone':
        return 'from-yellow-100 to-amber-200 dark:from-yellow-900 dark:to-amber-900'
      case 'sunstone youth group':
      case 'sunstone-youth-group':
        return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
      default:
        return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
    }
  }

  return (
    <div
      ref={drawerRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby="drawer-title"
      aria-describedby="drawer-description"
      className={`
        fixed inset-0 z-50 flex items-center justify-center p-4
        ${isMobile ? 'bg-black/50 backdrop-blur-sm' : ''}
        animate-in fade-in duration-200
      `}
    >
      {/* Backdrop for desktop */}
      {!isMobile && (
        <div
          className="absolute inset-0 bg-black/20 backdrop-blur-sm -z-10"
          onClick={onClose}
        />
      )}

      {/* Drawer Content */}
      <div
        className={`
          relative w-full max-w-2xl max-h-[90vh] overflow-y-auto
          ${isMobile
            ? 'h-full rounded-none'
            : 'max-h-[80vh] rounded-2xl shadow-2xl'
          }
          card-glass border border-white/20 dark:border-gray-700/20
          bg-gradient-to-br from-white/80 via-white/60 to-white/40
          dark:from-gray-900/80 dark:via-gray-900/60 dark:to-gray-900/40
          transition-all duration-300
        `}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 p-6 border-b border-white/20 dark:border-gray-700/20 bg-inherit/80 backdrop-blur-md">
          <div className="flex items-start justify-between">
            <div>
              <h1
                id="drawer-title"
                className="text-2xl font-bold text-foreground mb-2"
              >
                Events for {new Date(dayKey).toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </h1>
              <p id="drawer-description" className="text-sm text-muted-foreground">
                {events.length} event{events.length !== 1 ? 's' : ''} scheduled for this day
              </p>
            </div>

            <button
              data-close-button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-accent/50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-sin-orange"
              aria-label="Close drawer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Events List */}
        <div className="p-6 space-y-6">
          {events.map((event, index) => {
            const startDateTime = formatDateTime(event.start)
            const timeRange = formatTimeRange(event.start, event.end)

            return (
              <div
                key={event.id}
                className={`
                  relative p-6 rounded-xl border transition-all duration-200
                  ${index > 0 ? 'mt-6' : ''}
                  bg-gradient-to-br ${getProgramCardGradient(event.program)}
                  border-border/50
                  hover:shadow-lg
                `}
              >
                {/* Event Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-foreground mb-2">
                      {event.title}
                    </h2>
                    {event.program && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <Tag className="w-4 h-4" />
                        <span>{event.program}</span>
                      </div>
                    )}
                  </div>

                  {/* Time Badge */}
                  <div className={`ml-4 px-3 py-1 bg-gradient-to-r ${getProgramBadgeGradient(event.program)} text-foreground/90 text-sm font-medium rounded-full`}>
                    <Clock className="w-3 h-3 inline mr-1" />
                    {timeRange}
                  </div>
                </div>

                {/* Event Details Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Location */}
                  {event.location && (
                    <div className="flex items-start gap-3">
                      <MapPin className={`w-5 h-5 ${getProgramIconColor(event.program)} mt-0.5 flex-shrink-0`} />
                      <div>
                        <h3 className="font-semibold text-sm text-foreground mb-1">Location</h3>
                        <p className="text-muted-foreground">{event.location}</p>
                      </div>
                    </div>
                  )}

                  {/* Capacity */}
                  {event.capacity && (
                    <div className="flex items-start gap-3">
                      <Users className={`w-5 h-5 ${getProgramIconColor(event.program)} mt-0.5 flex-shrink-0`} />
                      <div>
                        <h3 className="font-semibold text-sm text-foreground mb-1">Capacity</h3>
                        <p className="text-muted-foreground">{event.capacity} attendees</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                {event.description && (
                  <div className="mt-4">
                    <h3 className="font-semibold text-sm text-foreground mb-2">Description</h3>
                    <p className="text-muted-foreground leading-relaxed">{event.description}</p>
                  </div>
                )}

                {/* Registration Link */}
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 p-6 border-t border-white/20 dark:border-gray-700/20 bg-inherit/80 backdrop-blur-md">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              {events.length} event{events.length !== 1 ? 's' : ''} total
            </p>
            <button
              onClick={onClose}
              className="px-6 py-2 bg-gradient-to-r from-sin-orange to-sin-yellow text-white font-medium rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sin-orange focus:ring-offset-2"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
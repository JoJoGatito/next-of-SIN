'use client'

import { EventDTO } from './CalendarMonth'

interface EventPillProps {
  event: EventDTO
  isMultiDay?: boolean | undefined
  isFirstDay?: boolean | undefined
  isLastDay?: boolean | undefined
  fullHeight?: boolean
  className?: string
}

export default function EventPill({
  event,
  isMultiDay = false,
  isFirstDay = false,
  isLastDay = false,
  fullHeight = false,
  className = ''
}: EventPillProps) {
  // Format time if available
  const formatTime = (isoString: string) => {
    try {
      const date = new Date(isoString)
      return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      })
    } catch {
      return null
    }
  }

  const startTime = event.start ? formatTime(event.start) : null
  const endTime = event.end ? formatTime(event.end) : null

  // Create display text
  const displayText = startTime && endTime
    ? `${startTime}-${endTime} ${event.title}`
    : event.title
  
  // Multi-day indicators
  const showStartIndicator = isMultiDay && isFirstDay
  const showEndIndicator = isMultiDay && isLastDay
  const showContinuationIndicator = isMultiDay && !isFirstDay && !isLastDay
  
  const getProgramGradient = (program?: string) => {
    switch (program) {
      case 'hue-house':
        return 'from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900'
      case 'rock-and-stone':
        return 'from-yellow-100 to-amber-200 dark:from-yellow-900 dark:to-amber-900'
      case 'sunstone-youth-group':
        return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
      default:
        return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
    }
  }
  
  const gradientClass = getProgramGradient(event.program)

  const getProgramTextColor = (program?: string) => {
    switch (program) {
      case 'hue-house':
        return 'text-purple-800 dark:text-purple-200'
      case 'rock-and-stone':
        return 'text-yellow-800 dark:text-yellow-200'
      case 'sunstone-youth-group':
        return 'text-orange-800 dark:text-orange-200'
      default:
        return 'text-orange-800 dark:text-orange-200'
    }
  }

  const programTextClass = getProgramTextColor(event.program)

  
  const baseClasses = `
    relative group cursor-pointer
    rounded
    bg-gradient-to-r ${gradientClass}
    backdrop-blur-sm bg-clip-padding
    border border-border shadow-sm
    hover:shadow-md
    transition-all duration-200
  `
  
  const pillClasses = fullHeight
    ? `h-full flex flex-col justify-between p-3 text-sm font-medium ${className}`
    : `text-xs font-medium rounded-md px-2 py-1 hover:scale-[1.02] ${className}`
  
  return (
    <div
      className={`${baseClasses} ${pillClasses}`}
      role="button"
      tabIndex={0}
      aria-label={`Event: ${event.title}${startTime ? ` at ${startTime}` : ''}${endTime ? ` until ${endTime}` : ''}${isMultiDay ? ` (${isFirstDay ? 'starts' : isLastDay ? 'ends' : 'continues'} here)` : ''}`}
      title={`${event.title}${startTime ? ` (${startTime}${endTime ? `-${endTime}` : ''})` : ''}`}
    >
      {/* Multi-day indicators */}
      {showStartIndicator && (
        <div
          className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-sin-orange rounded-full border border-border"
          aria-label="Event starts here"
        />
      )}
      {showEndIndicator && (
        <div
          className="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-sin-yellow rounded-full border border-border"
          aria-label="Event ends here"
        />
      )}
      {showContinuationIndicator && (
        <div
          className="absolute -left-1 -right-1 top-1/2 -translate-y-1/2 h-0.5 bg-gradient-to-r from-sin-orange/50 via-sin-yellow/50 to-sin-yellow/50"
          aria-label="Event continues"
        />
      )}
      
      {fullHeight ? (
        <>
          <div className="space-y-1 text-foreground flex-1">
            <h4 className="font-bold text-base leading-tight line-clamp-2">{event.title}</h4>
            {event.program && <p className={`text-sm ${programTextClass}`}>{event.program}</p>}
            {startTime && (
              <p className="text-xs opacity-90">
                {startTime}{endTime ? ` - ${endTime}` : ''}
              </p>
            )}
            {event.location && (
              <p className="text-xs opacity-80">📍 {event.location}</p>
            )}
          </div>
        </>
      ) : (
        <div className="text-foreground truncate min-w-0">
          {displayText}
        </div>
      )}
      
      {!fullHeight && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-muted/95 text-foreground text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
          {event.title}
          {startTime && (
            <div className="text-foreground/80">
              {startTime}{endTime ? ` - ${endTime}` : ''}
            </div>
          )}
          {event.location && (
            <div className="text-foreground/80">📍 {event.location}</div>
          )}
          <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-muted"></div>
        </div>
      )}
    </div>
  )
}
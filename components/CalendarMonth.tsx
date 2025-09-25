'use client'

import { useState, useEffect, useRef } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import EventPill from './EventPill'

export interface EventDTO {
  id: string
  title: string
  slug?: string
  start: string // ISO
  end?: string // ISO
  location?: string
  program?: string
  description?: string
  capacity?: number
  registrationUrl?: string
}

interface CalendarMonthProps {
  year: number
  month: number // 0-11
  dayEvents: Record<string, EventDTO[]>
  selectedDay?: string // YYYY-MM-DD
  onSelectDay: (day: string) => void
  locale?: string
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6 // 0 = Sunday, 1 = Monday, etc.
}

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const FULL_WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

export default function CalendarMonth({
  year,
  month,
  dayEvents,
  selectedDay,
  onSelectDay,
  locale = 'en-US',
  weekStartsOn = 0 // Sunday by default
}: CalendarMonthProps) {
  const [focusedDay, setFocusedDay] = useState<string | null>(selectedDay || null)
  const gridRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate calendar days for the given month
  const getCalendarDays = () => {
    const firstDayOfMonth = new Date(year, month, 1)
    const lastDayOfMonth = new Date(year, month + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()

    // Get the starting day of the week for the first day of the month
    const firstDayWeekday = firstDayOfMonth.getDay()

    // Calculate how many days to show before the first day of the month
    const startOffset = (firstDayWeekday - weekStartsOn + 7) % 7

    // Calculate total days to show (including padding)
    const totalDays = 35 // Always show 5 weeks for consistency
    const days: Array<{
      date: Date
      dayKey: string
      isCurrentMonth: boolean
      isToday: boolean
      events: EventDTO[]
    }> = []

    // Add days before the month starts (padding)
    const prevMonth = new Date(year, month, 0)
    for (let i = startOffset - 1; i >= 0; i--) {
      const dayDate = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), prevMonth.getDate() - i)
      const dayKey = dayDate.toISOString().split('T')[0]
      days.push({
        date: dayDate,
        dayKey,
        isCurrentMonth: false,
        isToday: false,
        events: dayEvents[dayKey] || []
      })
    }

    // Add days of the current month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayDate = new Date(year, month, day)
      const dayKey = dayDate.toISOString().split('T')[0]
      const today = new Date()
      const isToday = dayDate.toDateString() === today.toDateString()

      days.push({
        date: dayDate,
        dayKey,
        isCurrentMonth: true,
        isToday,
        events: dayEvents[dayKey] || []
      })
    }

    // Add days after the month ends to fill the grid (up to 35 days total)
    const remainingDays = totalDays - days.length
    for (let day = 1; day <= remainingDays; day++) {
      const nextMonth = new Date(year, month + 1, day)
      const dayKey = nextMonth.toISOString().split('T')[0]
      days.push({
        date: nextMonth,
        dayKey,
        isCurrentMonth: false,
        isToday: false,
        events: dayEvents[dayKey] || []
      })
    }

    return days
  }

  const calendarDays = getCalendarDays()
  const today = new Date()
  const isCurrentMonth = today.getFullYear() === year && today.getMonth() === month

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!focusedDay) return

      const currentIndex = calendarDays.findIndex(day => day.dayKey === focusedDay)
      if (currentIndex === -1) return

      let newIndex = currentIndex
      let newFocusedDay = focusedDay

      switch (event.key) {
        case 'ArrowUp':
          newIndex = currentIndex - 7
          break
        case 'ArrowDown':
          newIndex = currentIndex + 7
          break
        case 'ArrowLeft':
          newIndex = currentIndex - 1
          break
        case 'ArrowRight':
          newIndex = currentIndex + 1
          break
        case 'Home':
          // Go to first day of month
          newIndex = calendarDays.findIndex(day => day.isCurrentMonth) || 0
          break
        case 'End':
          // Go to last day of month
          const lastCurrentMonthIndex = calendarDays.map((day, i) => ({ day, i })).filter(({ day }) => day.isCurrentMonth).pop()?.i || calendarDays.length - 1
          newIndex = lastCurrentMonthIndex
          break
        case 'Enter':
        case ' ':
          event.preventDefault()
          onSelectDay(focusedDay)
          return
        case 'Escape':
          setFocusedDay(null)
          return
        default:
          return
      }

      // Wrap around if needed
      if (newIndex < 0) {
        newIndex = calendarDays.length - 1
      } else if (newIndex >= calendarDays.length) {
        newIndex = 0
      }

      const newDay = calendarDays[newIndex]
      newFocusedDay = newDay.dayKey
      setFocusedDay(newFocusedDay)

      // Scroll the focused day into view
      const focusedElement = document.getElementById(`calendar-day-${newFocusedDay}`)
      if (focusedElement) {
        focusedElement.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }

    if (focusedDay) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [focusedDay, calendarDays, onSelectDay])

  const formatMonthYear = (date: Date) => {
    return date.toLocaleDateString(locale, { month: 'long', year: 'numeric' })
  }

  const handleDayClick = (dayKey: string) => {
    onSelectDay(dayKey)
    setFocusedDay(dayKey)
  }

  const handleDayFocus = (dayKey: string) => {
    setFocusedDay(dayKey)
  }

  return (
    <div className="calendar-month" ref={containerRef}>
      {/* Month Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-foreground mb-2">
          {formatMonthYear(new Date(year, month, 1))}
        </h2>
        <div className="text-sm text-muted-foreground">
          Use arrow keys to navigate • Enter/Space to select • Esc to exit
        </div>
      </div>

      {/* Calendar Grid */}
      <div
        role="grid"
        ref={gridRef}
        className="grid grid-cols-7 gap-1 p-4 rounded-2xl backdrop-blur-xl bg-card/50 border border-border/50 shadow-lg"
        aria-label={`Calendar for ${formatMonthYear(new Date(year, month, 1))}`}
      >
        {/* Weekday Headers */}
        {WEEKDAYS.map((weekday, index) => (
          <div
            key={weekday}
            role="columnheader"
            className="p-3 text-center font-semibold text-muted-foreground text-sm"
            aria-label={FULL_WEEKDAYS[index]}
          >
            {weekday}
          </div>
        ))}

        {/* Calendar Days */}
        {calendarDays.map((day) => (
          <div
            key={day.dayKey}
            id={`calendar-day-${day.dayKey}`}
            role="gridcell"
            tabIndex={focusedDay === day.dayKey ? 0 : -1}
            className={`
              relative min-h-[120px] p-2 rounded-lg border transition-all duration-200 cursor-pointer
              backdrop-blur-sm hover:bg-accent/50 focus:outline-none focus:ring-2 focus:ring-sin-orange
              ${day.isCurrentMonth
                ? 'bg-background/50 border-border/50'
                : 'bg-muted/30 border-muted/30 text-muted-foreground'
              }
              ${focusedDay === day.dayKey
                ? 'ring-2 ring-sin-orange bg-sin-orange/10'
                : ''
              }
              ${selectedDay === day.dayKey
                ? 'bg-sin-orange/20 border-sin-orange/50 shadow-md'
                : ''
              }
              ${day.isToday && day.isCurrentMonth
                ? 'ring-2 ring-sin-orange/50 bg-sin-yellow/10'
                : ''
              }
            `}
            onClick={() => handleDayClick(day.dayKey)}
            onFocus={() => handleDayFocus(day.dayKey)}
            aria-selected={selectedDay === day.dayKey}
            aria-label={`${day.date.toLocaleDateString(locale, {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}${day.isToday ? ' (today)' : ''}${day.events.length > 0 ? `, ${day.events.length} event${day.events.length > 1 ? 's' : ''}` : ''}`}
          >
            {/* Day number */}
            <div className={`
              text-sm font-semibold mb-2
              ${day.isToday && day.isCurrentMonth ? 'text-sin-orange' : 'text-foreground'}
              ${selectedDay === day.dayKey ? 'text-white' : ''}
            `}>
              {day.date.getDate()}
            </div>

            {/* Today indicator */}
            {day.isToday && day.isCurrentMonth && (
              <div className="absolute top-1 right-1 w-2 h-2 bg-sin-orange rounded-full" />
            )}

            {/* Events */}
            {day.events.length > 0 && (
              <div className="space-y-1">
                {day.events.length === 1 ? (
                  (() => {
                    const event = day.events[0]
                    const eventStart = event.start ? new Date(event.start) : null
                    const eventEnd = event.end ? new Date(event.end) : null
                    const currentDay = new Date(day.dayKey)
            
                    const isMultiDay = eventStart && eventEnd &&
                      (eventEnd.getTime() - eventStart.getTime()) > 24 * 60 * 60 * 1000
            
                    const isFirstDay = isMultiDay && eventStart &&
                      currentDay.toDateString() === eventStart.toDateString()
            
                    const isLastDay = isMultiDay && eventEnd &&
                      currentDay.toDateString() === eventEnd.toDateString()
            
                    return (
                      <EventPill
                        key={event.id}
                        event={event}
                        fullHeight={true}
                        isMultiDay={isMultiDay || undefined}
                        isFirstDay={isFirstDay || undefined}
                        isLastDay={isLastDay || undefined}
                      />
                    )
                  })()
                ) : (
                  day.events.slice(0, 3).map((event) => {
                    const eventStart = event.start ? new Date(event.start) : null
                    const eventEnd = event.end ? new Date(event.end) : null
                    const currentDay = new Date(day.dayKey)
            
                    const isMultiDay = eventStart && eventEnd &&
                      (eventEnd.getTime() - eventStart.getTime()) > 24 * 60 * 60 * 1000
            
                    const isFirstDay = isMultiDay && eventStart &&
                      currentDay.toDateString() === eventStart.toDateString()
            
                    const isLastDay = isMultiDay && eventEnd &&
                      currentDay.toDateString() === eventEnd.toDateString()
            
                    return (
                      <EventPill
                        key={event.id}
                        event={event}
                        isMultiDay={isMultiDay || undefined}
                        isFirstDay={isFirstDay || undefined}
                        isLastDay={isLastDay || undefined}
                      />
                    )
                  })
                )}
                {day.events.length > 3 && (
                  <div className="text-xs text-muted-foreground font-medium">
                    +{day.events.length - 3} more
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
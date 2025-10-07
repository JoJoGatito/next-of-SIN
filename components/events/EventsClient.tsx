'use client'

import { useState, useEffect, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'
import CalendarMonth, { EventDTO } from '../CalendarMonth'
import EventDayDrawer from '../EventDayDrawer'

interface Event extends EventDTO {
  // Extending EventDTO for additional compatibility with existing list view
  attendees?: number
  time?: string
  date?: string
}

interface EventsClientProps {
  events: Event[]
}

type ViewMode = 'list' | 'calendar'

function getProgramColor(program?: string) {
  switch (program) {
    case 'Hue House':
    case 'hue house':
    case 'hue-house':
      return 'from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900'
    case 'Rock & Stone':
    case 'rock and stone':
    case 'rock-and-stone':
      return 'from-yellow-100 to-amber-200 dark:from-yellow-900 dark:to-amber-900'
    case 'Sunstone Youth Group':
    case 'sunstone youth group':
    case 'sunstone-youth-group':
      return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
    default:
      return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
  }
}

export default function EventsClient({ events }: EventsClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  // Initialize state from URL parameters
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    const view = searchParams.get('view')
    return (view === 'list' || view === 'calendar') ? view : 'list'
  })

  const [selectedDay, setSelectedDay] = useState<string>(() => {
    const day = searchParams.get('d')
    return day && /^\d{4}-\d{2}-\d{2}$/.test(day) ? day : ''
  })

  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
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

  // Update URL when view mode changes (idempotent; avoid searchParams in deps to prevent loops)
  useEffect(() => {
    const currentSearch = typeof window !== 'undefined' ? window.location.search : ''
    const params = new URLSearchParams(currentSearch)

    if (viewMode === 'list') {
      // Clear 'view' and 'd' when switching to list
      params.delete('view')
      params.delete('d')
      // Only clear state if previously set to avoid redundant updates
      setSelectedDay(prev => (prev ? '' : prev))
    } else {
      params.set('view', viewMode)
    }

    const nextQuery = params.toString()
    const nextUrl = nextQuery ? `?${nextQuery}` : ''

    if (nextUrl !== currentSearch) {
      router.replace(nextUrl, { scroll: false })
    }
  }, [viewMode, router])

  // Update URL when selected day changes (idempotent)
  useEffect(() => {
    if (!selectedDay) return

    const currentSearch = typeof window !== 'undefined' ? window.location.search : ''
    const params = new URLSearchParams(currentSearch)

    // If it's already set to this value, do nothing
    if (params.get('d') === selectedDay) return

    params.set('d', selectedDay)
    const newUrl = `?${params.toString()}`
    router.replace(newUrl, { scroll: false })
  }, [selectedDay, router])

  // Handle view mode toggle
  const handleViewToggle = (mode: ViewMode) => {
    setViewMode(mode)
  }

  // Handle day selection
  const handleDaySelect = (day: string) => {
    setSelectedDay(day)
    // Only open drawer on desktop, mobile shows inline agenda
    if (!isMobile) {
      setIsDrawerOpen(true)
    }
  }

  // Close drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false)
  }

  // Get events for selected day
  const selectedDayEvents = useMemo(() => {
    if (!selectedDay) return []
    return events.filter(event => {
      if (!event.start) return false
      const eventDate = new Date(event.start).toISOString().split('T')[0]
      return eventDate === selectedDay
    })
  }, [events, selectedDay])

  // Prepare events data for calendar (grouped by day)
  const dayEvents = useMemo(() => {
    const grouped: Record<string, EventDTO[]> = {}
    events.forEach(event => {
      if (!event.start) return
      const eventDate = new Date(event.start).toISOString().split('T')[0]
      if (!grouped[eventDate]) {
        grouped[eventDate] = []
      }
      grouped[eventDate].push(event)
    })
    return grouped
  }, [events])

  // Get current month and year for calendar
  const currentDate = new Date()
  const currentYear = currentDate.getFullYear()
  const currentMonth = currentDate.getMonth()

  // Log to validate whether previous fallback would have triggered
  console.log('[EventsClient] received events', { count: events.length, wouldFallback: events.length === 0 })

  // Use only server-provided events (no mock fallback)
  const displayEvents = events

  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Calendar className="w-16 h-16 mx-auto mb-6 text-sin-orange" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Upcoming Events
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Join us at our next community gatherings, workshops, and support groups
          </p>
        </div>

        {/* View Toggle Bar */}
        <div className="bg-card-glass rounded-2xl p-4 mb-8 flex justify-center">
          <div className="flex gap-2">
            <button
              onClick={() => handleViewToggle('list')}
              className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                viewMode === 'list'
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg'
                  : 'bg-muted text-foreground/70 hover:text-foreground'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => handleViewToggle('calendar')}
              className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                viewMode === 'calendar'
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg'
                  : 'bg-muted text-foreground/70 hover:text-foreground'
              }`}
            >
              Calendar View
            </button>
          </div>
        </div>

        {/* Events Display */}
        {viewMode === 'list' ? (
          <div className="space-y-4">
            {displayEvents.length > 0 ? (
              displayEvents.map((event) => (
                <div
                  key={event.id}
                  className="relative overflow-hidden rounded-2xl hover:scale-[1.02] transition-transform duration-300 cursor-pointer"
                  onClick={() => {/* Optional: toggle details if needed */}}
                >
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getProgramColor(event.program)} opacity-90`} />
                  
                  {/* Glass morphism card */}
                  <div className="relative backdrop-blur-xl bg-card/20 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1">{event.title}</h3>
                        {event.program && (
                          <div className="flex items-center gap-2 mb-2">
                            <span className="bg-muted/80 backdrop-blur px-3 py-1 rounded-full text-foreground text-sm">
                              {event.program}
                            </span>
                          </div>
                        )}
                        {event.description && <p className="text-foreground/80 text-sm mb-3">{event.description}</p>}
                        
                        <div className="flex flex-wrap gap-4 text-sm text-foreground/70">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-foreground/80" />
                            {new Date(event.start).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4 text-foreground/80" />
                            {new Date(event.start).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })}
                            {event.end && (
                              <>
                                {' - '}
                                {new Date(event.end).toLocaleTimeString('en-US', {
                                  hour: 'numeric',
                                  minute: '2-digit',
                                  hour12: true
                                })}
                              </>
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-foreground/80" />
                            {event.location}
                          </div>
                          {event.capacity && (
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4 text-foreground/80" />
                              {event.attendees || 0}/{event.capacity} spots
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="text-foreground/70 text-sm">
                        <Calendar className="w-6 h-6 text-foreground/50 mb-2" />
                      </div>
                    </div>
                    
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-foreground/30" />
                <p className="text-foreground/60">No events found for the selected category.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="card-glass">
            {/* Program Legend */}
            <div className="mb-4 p-3 bg-muted/50 rounded-lg">
              <h3 className="text-sm font-semibold text-foreground mb-2">Program Colors</h3>
              <div className="flex flex-wrap gap-3">
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-gradient-to-r from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900 rounded"></div>
                  <span className="text-xs text-foreground/80">Hue House</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-gradient-to-r from-yellow-100 to-amber-200 dark:from-yellow-900 dark:to-amber-900 rounded"></div>
                  <span className="text-xs text-foreground/80">Rock & Stone</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-2 bg-gradient-to-r from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900 rounded"></div>
                  <span className="text-xs text-foreground/80">Sunstone Youth Group</span>
                </div>
              </div>
            </div>

            <CalendarMonth
              year={currentYear}
              month={currentMonth}
              dayEvents={dayEvents}
              selectedDay={selectedDay}
              onSelectDay={handleDaySelect}
              locale="en-US"
              weekStartsOn={0}
            />

            {/* Mobile inline agenda */}
            {isMobile && (
              <div className="mt-6 md:hidden">
                {!selectedDay ? (
                  <div className="text-center py-8">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-foreground/30" />
                    <p className="text-foreground/60">Tap a date to see events</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 pb-2 border-b border-border/50">
                      <Calendar className="w-5 h-5 text-sin-orange" />
                      <h3 className="text-lg font-bold text-foreground">
                        Events for {new Date(selectedDay).toLocaleDateString('en-US', {
                          weekday: 'long',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </h3>
                    </div>

                    {selectedDayEvents.length > 0 ? (
                      selectedDayEvents.map((event) => (
                        <div
                          key={event.id}
                          className="relative overflow-hidden rounded-xl hover:scale-[1.02] transition-transform duration-300"
                        >
                          {/* Gradient background */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${getProgramColor(event.program)} opacity-90`} />

                          {/* Glass morphism card */}
                          <div className="relative backdrop-blur-xl bg-card/20 p-4">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="text-lg font-bold text-foreground mb-1">{event.title}</h4>
                                {event.program && (
                                  <div className="flex items-center gap-2 mb-2">
                                    <span className="bg-muted/80 backdrop-blur px-2 py-1 rounded-full text-foreground text-sm">
                                      {event.program}
                                    </span>
                                  </div>
                                )}
                                {event.description && (
                                  <p className="text-foreground/80 text-sm mb-2">{event.description}</p>
                                )}

                                <div className="flex flex-wrap gap-3 text-sm text-foreground/70">
                                  <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    {new Date(event.start).toLocaleTimeString('en-US', {
                                      hour: 'numeric',
                                      minute: '2-digit',
                                      hour12: true
                                    })}
                                    {event.end && (
                                      <>
                                        {' - '}
                                        {new Date(event.end).toLocaleTimeString('en-US', {
                                          hour: 'numeric',
                                          minute: '2-digit',
                                          hour12: true
                                        })}
                                      </>
                                    )}
                                  </div>
                                  {event.location && (
                                    <div className="flex items-center gap-1">
                                      <MapPin className="w-4 h-4" />
                                      {event.location}
                                    </div>
                                  )}
                                  {event.capacity && (
                                    <div className="flex items-center gap-1">
                                      <Users className="w-4 h-4" />
                                      {event.attendees || 0}/{event.capacity} spots
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <Calendar className="w-12 h-12 mx-auto mb-4 text-foreground/30" />
                        <p className="text-foreground/60">No events on this date</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Event Day Drawer */}
        <EventDayDrawer
          isOpen={isDrawerOpen}
          onClose={handleCloseDrawer}
          events={selectedDayEvents}
          dayKey={selectedDay}
        />
      </div>
    </div>
  )
}
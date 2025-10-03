'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import OrbField from '@/components/OrbField'
interface TimelineEvent {
  id: string
  title?: string
  start?: string
  end?: string
  location?: string
  program?: string
  description?: string
  capacity?: number
}

interface InteractiveEventsTimelineProps {
  events: TimelineEvent[]
}

function getProgramColor(program?: string) {
  switch (program) {
    case 'Hue House':
      return 'from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900'
    case 'Rock & Stone':
      return 'from-yellow-100 to-amber-200 dark:from-yellow-900 dark:to-amber-900'
    case 'Sunstone Youth Group':
      return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
    default:
      return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
  }
}

export default function InteractiveEventsTimeline({ events }: InteractiveEventsTimelineProps) {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null)

  useEffect(() => {
    console.log('[InteractiveEventsTimeline] received events', { count: events.length })
  }, [events])

  // Show only the first 3 upcoming events
  const upcomingEvents = (events || []).slice(0, 3)

  return (
    <section className="relative overflow-hidden py-16 px-4 md:px-8 lg:px-16 bg-transparent dark:bg-transparent">
      <OrbField seed="events" count={3} />
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="gradient-text">Events</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Join us for community, learning, and celebration
          </p>
        </div>

        {/* Timeline */}
        <div className="relative timeline">
          {/* Vertical line driven by CSS variable for perfect alignment */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-sin-orange via-sin-yellow to-sin-red timeline-line" />
          
          {upcomingEvents.map((event, index) => (
            <div
              key={event.id}
              className={`relative timeline-item mb-8 md:mb-12 ${
                index % 2 === 0 ? 'md:pr-1/2 timeline-left' : 'md:pl-1/2 md:ml-auto timeline-right'
              } md:w-1/2`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Event card - adjusted spacing for mobile */}
              <div
                onClick={() => setSelectedEvent(selectedEvent === event.id ? null : event.id)}
                className={`ml-14 md:ml-0 ${
                  index % 2 === 0 ? 'md:mr-12' : 'md:ml-12'
                } cursor-pointer group`}
              >
                <div className="relative overflow-hidden rounded-2xl transition-all duration-300 hover:transform hover:scale-105 animate-fade-in">
                  {/* Gradient background */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${getProgramColor(event.program)} opacity-90`} />
                  
                  {/* Glass morphism card */}
                  <div className="relative backdrop-blur-xl bg-card/20 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-foreground">{event.title}</h3>
                        <p className="text-foreground/80 text-sm mt-1">{event.program}</p>
                      </div>
                      <span className="bg-muted/80 backdrop-blur px-3 py-1 rounded-full text-foreground text-sm">
                        {event.program ?? 'Upcoming'}
                      </span>
                    </div>
                    
                    {/* Event details */}
                    <div className={`grid grid-cols-1 gap-2 text-foreground/90 text-sm transition-all duration-300 ${
                      selectedEvent === event.id ? 'opacity-100 max-h-40' : 'opacity-70 max-h-0 overflow-hidden'
                    }`}>
                      <div className="flex items-center gap-2 mt-3">
                        <Calendar className="w-4 h-4" />
                        {event.start
                          ? new Date(event.start).toLocaleDateString('en-US', {
                              weekday: 'long',
                              month: 'long',
                              day: 'numeric'
                            })
                          : 'Date TBD'}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.start
                          ? new Date(event.start).toLocaleTimeString('en-US', {
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true
                            })
                          : 'Time TBD'}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                    
                    {/* Click indicator */}
                    <div className={`text-muted-foreground text-xs mt-3 ${selectedEvent === event.id ? 'hidden' : ''}`}>
                      Click for details
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <style jsx>{`
        /* Use CSS variables so the line and dots share an exact x-position */
        .timeline {
          /* Defaults: desktop */
          --line-x: 50%;
          --line-w: 2px;          /* even px for crisp rendering */
          --dot-size: 16px;       /* matches previous w-4 (16px) */
          --dot-border: 4px;      /* matches previous border-4 (4px) */
          --dot-color: #f97316;   /* accent (approx. orange-500) */
          --dot-bg: #ffffff;
          position: relative;
        }
        /* Mobile: move line to fixed offset */
        @media (max-width: 767px) {
          .timeline { --line-x: 24px; }
        }
        /* Line aligns to the same x as dots */
        .timeline-line {
          left: var(--line-x);
          transform: translateX(-50%);
          pointer-events: none;
        }
        /* Dot is centered on the line and each item */
        .timeline-item::before {
          content: "";
          position: absolute;
          left: var(--item-line-x);
          top: 50%;
          transform: translate(-50%, -50%);
          width: var(--dot-size);
          height: var(--dot-size);
          background: var(--dot-bg);
          border: var(--dot-border) solid var(--dot-color);
          border-radius: 9999px;
          box-shadow: 0 0 0 2px #fff; /* halo for contrast on light bg */
          z-index: 10;
        }
        /* Desktop alignment: left items meet the line at their right edge; right items at their left edge */
        .timeline-left { --item-line-x: 100%; }
        .timeline-right { --item-line-x: 0%; }
        /* Mobile: items are full-width; use the global line position */
        @media (max-width: 767px) {
          .timeline-left, .timeline-right { --item-line-x: var(--line-x); }
        }
        @media (prefers-color-scheme: dark) {
          .timeline-item::before { box-shadow: 0 0 0 2px #000; }
        }
      `}</style>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { PartyPopper, BookOpen, Utensils, HeartHandshake, Calendar, Clock, MapPin } from 'lucide-react'

const events = [
  {
    id: 1,
    title: "Pride Month Kickoff Celebration",
    date: "June 1, 2024",
    time: "6:00 PM",
    location: "Community Center",
    program: "Sunstone Youth Group",
    type: "celebration",
    color: "from-pink-400 to-purple-600",
    attendees: 150
  },
  {
    id: 2,
    title: "Disability Awareness Workshop",
    date: "June 5, 2024",
    time: "2:00 PM",
    location: "Virtual + In-Person",
    program: "Dis'abitch",
    type: "workshop",
    color: "from-blue-400 to-indigo-600",
    attendees: 75
  },
  {
    id: 3,
    title: "Community Potluck & Art Show",
    date: "June 10, 2024",
    time: "5:30 PM",
    location: "Hue House",
    program: "Cafeteria Collective",
    type: "gathering",
    color: "from-green-400 to-teal-600",
    attendees: 100
  },
  {
    id: 4,
    title: "Peer Support Circle",
    date: "June 15, 2024",
    time: "7:00 PM",
    location: "Rock & Stone Center",
    program: "Rock & Stone",
    type: "support",
    color: "from-yellow-400 to-orange-600",
    attendees: 30
  }
]

const typeIcons = {
  celebration: PartyPopper,
  workshop: BookOpen,
  gathering: Utensils,
  support: HeartHandshake
}

export default function InteractiveEventsTimeline() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredEvents = filter === 'all' 
    ? events 
    : events.filter(e => e.type === filter)

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Upcoming <span className="gradient-text">Events</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Join us for community, learning, and celebration
          </p>
          
          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-full transition-all duration-300 ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg' 
                  : 'bg-card text-muted-foreground hover:shadow-md border border-border'
              }`}
            >
              All Events
            </button>
            {Object.keys(typeIcons).map(type => (
              <button
                key={type}
                onClick={() => setFilter(type)}
                className={`px-4 py-2 rounded-full transition-all duration-300 ${
                  filter === type 
                    ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg' 
                    : 'bg-card text-muted-foreground hover:shadow-md border border-border'
                }`}
              >
                {(() => {
                  const Icon = typeIcons[type as keyof typeof typeIcons]
                  return <><Icon className="inline w-4 h-4 mr-1" /> {type.charAt(0).toUpperCase() + type.slice(1)}</>
                })()}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="relative timeline">
          {/* Vertical line driven by CSS variable for perfect alignment */}
          <div className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-sin-orange via-sin-yellow to-sin-red timeline-line" />
          
          {filteredEvents.map((event, index) => (
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
                  <div className={`absolute inset-0 bg-gradient-to-br ${event.color} opacity-90`} />
                  
                  {/* Glass morphism card */}
                  <div className="relative backdrop-blur-xl bg-white/20 dark:bg-black/20 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="text-sin-orange">
                          {(() => {
                            const Icon = typeIcons[event.type as keyof typeof typeIcons]
                            return <Icon className="w-8 h-8" />
                          })()}
                        </span>
                        <h3 className="text-xl font-bold text-white mt-2">{event.title}</h3>
                        <p className="text-white/80 text-sm">{event.program}</p>
                      </div>
                      <span className="bg-white/20 backdrop-blur px-3 py-1 rounded-full text-white text-sm">
                        {event.attendees} attending
                      </span>
                    </div>
                    
                    {/* Event details */}
                    <div className={`grid grid-cols-1 gap-2 text-white/90 text-sm transition-all duration-300 ${
                      selectedEvent === event.id ? 'opacity-100 max-h-40' : 'opacity-70 max-h-0 overflow-hidden'
                    }`}>
                      <div className="flex items-center gap-2 mt-3">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                      <button className="mt-3 bg-white/20 backdrop-blur px-4 py-2 rounded-full text-white font-semibold hover:bg-white/30 transition-colors">
                        Register Now
                      </button>
                    </div>
                    
                    {/* Click indicator */}
                    <div className={`text-white/70 text-xs mt-3 ${selectedEvent === event.id ? 'hidden' : ''}`}>
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

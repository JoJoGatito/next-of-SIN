'use client'

import { useState } from 'react'
import { Calendar, Clock, MapPin, Users } from 'lucide-react'

interface Event {
  id: number
  title: string
  date: string
  time: string
  location: string
  description: string
  capacity?: number
  attendees?: number
}

export default function EventsPage() {
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('list')

  // Only show the 4 nearest upcoming events
  const upcomingEvents: Event[] = [
    {
      id: 1,
      title: 'Queer Youth Art Workshop',
      date: '2024-01-15',
      time: '3:00 PM - 5:00 PM',
      location: 'Sunstone Community Center',
      description: 'Express yourself through art in a safe and inclusive environment.',
      capacity: 20,
      attendees: 12
    },
    {
      id: 2,
      title: 'Disability Support Circle',
      date: '2024-01-17',
      time: '6:00 PM - 7:30 PM',
      location: 'Virtual Meeting',
      description: 'Connect with others and share experiences in a supportive setting.',
      capacity: 15,
      attendees: 8
    },
    {
      id: 3,
      title: 'BIPOC Community Dinner',
      date: '2024-01-20',
      time: '6:00 PM - 9:00 PM',
      location: 'Community Hall',
      description: 'Join us for food, music, and community building.',
      attendees: 45
    },
    {
      id: 4,
      title: 'Trans Support Group',
      date: '2024-01-22',
      time: '7:00 PM - 8:30 PM',
      location: 'Safe Space Center',
      description: 'A weekly support group for trans and non-binary individuals.',
      capacity: 12,
      attendees: 9
    }
  ]

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
              onClick={() => setViewMode('list')}
              className={`px-6 py-2.5 rounded-lg transition-all duration-200 font-medium ${
                viewMode === 'list' 
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg' 
                  : 'bg-muted text-foreground/70 hover:text-foreground'
              }`}
            >
              List View
            </button>
            <button
              onClick={() => setViewMode('calendar')}
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
            {upcomingEvents.length > 0 ? (
              upcomingEvents.map((event) => (
                <div 
                  key={event.id} 
                  className="card-glass hover:scale-[1.02] transition-transform duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="p-3 rounded-lg bg-sin-orange/10">
                          <Calendar className="w-6 h-6 text-sin-orange" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                          <p className="text-foreground/60 mb-3">{event.description}</p>
                          
                          <div className="flex flex-wrap gap-4 text-sm">
                            <div className="flex items-center gap-2 text-foreground/70">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.date).toLocaleDateString('en-US', { 
                                weekday: 'long', 
                                month: 'long', 
                                day: 'numeric' 
                              })}
                            </div>
                            <div className="flex items-center gap-2 text-foreground/70">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </div>
                            <div className="flex items-center gap-2 text-foreground/70">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                            {event.capacity && (
                              <div className="flex items-center gap-2 text-foreground/70">
                                <Users className="w-4 h-4" />
                                {event.attendees}/{event.capacity} spots filled
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <button className="btn-primary text-sm">
                        Register Now
                      </button>
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
            <div className="text-center py-12">
              <Calendar className="w-12 h-12 mx-auto mb-4 text-sin-orange" />
              <p className="text-lg font-semibold mb-2">Calendar View Coming Soon!</p>
              <p className="text-foreground/60">
                We're working on a beautiful calendar layout. Please use list view for now.
              </p>
            </div>
          </div>
        )}

      </div>
    </div>
  )
}
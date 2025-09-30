'use client'

import { useState } from 'react'
import Link from 'next/link'
import RainbowDivider from '@/components/RainbowDivider'
import { MapPin, Calendar, Users, BookOpen, ArrowRight, Clock, Tag, ExternalLink, Phone, Mail, MapPin as MapPinIcon } from 'lucide-react'

interface LocalEvent {
  id: string
  title: string
  start?: string
  end?: string
  location?: string
  address?: string
  description: string
  image?: any
  website?: string
  capacity?: number
}

interface Resource {
  id: string
  name: string
  slug?: any
  category?: string
  description: string
  link?: string
  contact?: {
    phone?: string
    email?: string
    address?: string
  }
  hours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
}

interface LocalPageClientProps {
  localEvents: LocalEvent[]
  resources: Resource[]
}

export default function LocalPageClient({ localEvents, resources }: LocalPageClientProps) {
  const [activeTab, setActiveTab] = useState<'events' | 'resources' | 'artists'>('events')

  const formatDateTime = (start?: string, end?: string) => {
    if (!start) return { date: '', time: '' }

    const startDate = new Date(start)
    const date = startDate.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric'
    })

    const time = startDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    })

    const endTime = end ? new Date(end).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    }) : ''

    return { date, time: endTime ? `${time} - ${endTime}` : time }
  }

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case 'healthcare':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
      case 'community-space':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
      case 'mutual-aid':
        return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200'
      default:
        return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200'
    }
  }


  return (
    <div className="min-h-screen py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <MapPin className="w-16 h-16 mx-auto mb-6 text-sin-orange" />
          <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
            Local Community Hub
          </h1>
          <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
            Discover local events, resources, and artists in our community.
            Connect, learn, and grow with us.
          </p>
        </div>

        <RainbowDivider marginClassName="my-8" />

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-muted rounded-full p-1 inline-flex">
            <button
              onClick={() => setActiveTab('events')}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'events'
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Calendar className="w-4 h-4" />
              Events
            </button>
            <button
              onClick={() => setActiveTab('resources')}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'resources'
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              Resources
            </button>
            <button
              onClick={() => setActiveTab('artists')}
              className={`px-6 py-3 rounded-full transition-all duration-300 flex items-center gap-2 ${
                activeTab === 'artists'
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg'
                  : 'text-foreground/70 hover:text-foreground'
              }`}
            >
              <Users className="w-4 h-4" />
              Artists
            </button>
          </div>
        </div>

        <RainbowDivider marginClassName="my-8" />

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Events Tab */}
          {activeTab === 'events' && (
            <div id="events">
              <h2 className="text-2xl font-bold mb-6">Upcoming Local Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localEvents.length > 0 ? (
                  localEvents.map((event) => {
                    const { date, time } = formatDateTime(event.start, event.end)
                    return (
                      <div key={event.id} className="card-glass group hover:scale-105 transition-transform duration-300">
                        {/* Event Image */}
                        {event.image && (
                          <div className="aspect-video bg-muted rounded-lg mb-4 overflow-hidden">
                            <img
                              src={event.image.asset?.url || event.image}
                              alt={event.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        )}

                        <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                        <p className="text-foreground/60 text-sm mb-4">{event.description}</p>

                        <div className="space-y-2 text-sm">
                          {date && (
                            <div className="flex items-center gap-2 text-foreground/70">
                              <Calendar className="w-4 h-4" />
                              {date}
                            </div>
                          )}
                          {time && (
                            <div className="flex items-center gap-2 text-foreground/70">
                              <Clock className="w-4 h-4" />
                              {time}
                            </div>
                          )}
                          {event.location && (
                            <div className="flex items-center gap-2 text-foreground/70">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          )}
                        </div>

                        <div className="flex gap-2 mt-4">
                          {event.website && (
                            <a
                              href={event.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary text-sm inline-flex items-center gap-1"
                            >
                              <ExternalLink className="w-3 h-3" />
                              Visit
                            </a>
                          )}
                          <button className="text-sin-orange font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                            Learn More <ArrowRight className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    )
                  })
                ) : (
                  <div className="col-span-full text-center py-12">
                    <Calendar className="w-12 h-12 mx-auto mb-4 text-foreground/30" />
                    <p className="text-foreground/60">No local events found. Check back soon for upcoming community events!</p>
                  </div>
                )}
              </div>
              <div className="text-center mt-8">
                <Link href="/local-events" className="btn-secondary inline-flex items-center gap-2">
                  View All Local Events <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div id="resources">
              <h2 className="text-2xl font-bold mb-6">Local Resources</h2>
              <div className="space-y-6">
                {resources.length > 0 ? (
                  resources.map((resource) => (
                    <div key={resource.id} className="card-glass">
                      <div className="md:flex md:items-start md:justify-between">
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-xl font-semibold">{resource.name}</h3>
                            {resource.category && (
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(resource.category)}`}>
                                {resource.category.replace('-', ' ')}
                              </span>
                            )}
                          </div>
                          <p className="text-foreground/60 mb-4">{resource.description}</p>

                          {resource.hours && Object.values(resource.hours).some(hour => hour) && (
                            <div className="mb-4">
                              <h4 className="text-sm font-medium mb-2">Hours:</h4>
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-sm text-foreground/70">
                                {Object.entries(resource.hours).map(([day, hours]) => (
                                  hours && (
                                    <div key={day} className="flex justify-between">
                                      <span className="capitalize">{day}:</span>
                                      <span>{hours}</span>
                                    </div>
                                  )
                                ))}
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="mt-4 md:mt-0 md:ml-8 flex flex-col gap-2">
                          {resource.link && (
                            <a
                              href={resource.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-primary inline-flex items-center gap-2"
                            >
                              <ExternalLink className="w-4 h-4" />
                              Visit Website
                            </a>
                          )}

                          {resource.contact && (
                            <div className="space-y-2">
                              {resource.contact.phone && (
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                  <Phone className="w-4 h-4" />
                                  <a href={`tel:${resource.contact.phone}`} className="hover:text-sin-orange">
                                    {resource.contact.phone}
                                  </a>
                                </div>
                              )}
                              {resource.contact.email && (
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                  <Mail className="w-4 h-4" />
                                  <a href={`mailto:${resource.contact.email}`} className="hover:text-sin-orange">
                                    {resource.contact.email}
                                  </a>
                                </div>
                              )}
                              {resource.contact.address && (
                                <div className="flex items-center gap-2 text-sm text-foreground/70">
                                  <MapPinIcon className="w-4 h-4" />
                                  <span>{resource.contact.address}</span>
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 text-foreground/30" />
                    <p className="text-foreground/60">No resources found. Check back soon for community resources!</p>
                  </div>
                )}
              </div>
              <div className="text-center mt-8">
                <Link href="/resources" className="btn-secondary inline-flex items-center gap-2">
                  View All Resources <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Artists Tab - Temporarily Hidden */}
          {activeTab === 'artists' && (
            <div id="artists">
              <h2 className="text-2xl font-bold mb-6">Featured Local Artists</h2>
              <div className="text-center py-12">
                <Users className="w-12 h-12 mx-auto mb-4 text-foreground/30" />
                <p className="text-foreground/60">Artist directory coming soon!</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Calendar, Users, BookOpen, ArrowRight, Clock, Tag } from 'lucide-react'

export default function LocalPage() {
  const [activeTab, setActiveTab] = useState<'events' | 'resources' | 'artists'>('events')

  const localEvents = [
    {
      id: 1,
      title: 'Community Art Workshop',
      date: 'Saturday, Nov 15',
      time: '2:00 PM - 5:00 PM',
      location: 'Sunstone Community Center',
      description: 'Join us for an inclusive art workshop open to all skill levels.',
      category: 'Workshop'
    },
    {
      id: 2,
      title: 'Queer Youth Support Group',
      date: 'Every Tuesday',
      time: '6:00 PM - 7:30 PM',
      location: 'Virtual Meeting',
      description: 'A safe space for LGBTQ+ youth to connect and share experiences.',
      category: 'Support Group'
    },
    {
      id: 3,
      title: 'Disability Pride Festival',
      date: 'Sunday, Dec 3',
      time: '10:00 AM - 4:00 PM',
      location: 'Central Park',
      description: 'Celebrate disability pride with performances, vendors, and community.',
      category: 'Festival'
    }
  ]

  const localResources = [
    {
      id: 1,
      name: 'LGBTQ+ Health Clinic',
      description: 'Providing affirming healthcare services for the LGBTQ+ community.',
      services: ['Primary Care', 'Mental Health', 'HRT Support'],
      contact: '555-0123'
    },
    {
      id: 2,
      name: 'Disability Advocacy Center',
      description: 'Supporting individuals with disabilities through advocacy and resources.',
      services: ['Legal Aid', 'Housing Support', 'Employment Services'],
      contact: '555-0456'
    },
    {
      id: 3,
      name: 'BIPOC Community Fund',
      description: 'Emergency financial assistance for BIPOC community members.',
      services: ['Emergency Funds', 'Food Support', 'Housing Assistance'],
      contact: '555-0789'
    }
  ]

  const localArtists = [
    {
      id: 1,
      name: 'Jordan Martinez',
      medium: 'Visual Art',
      description: 'Exploring themes of identity and community through vibrant murals.',
      featured: 'Sunstone Mural Project'
    },
    {
      id: 2,
      name: 'Alex Chen',
      medium: 'Music',
      description: 'Creating inclusive music spaces for disabled musicians.',
      featured: 'Accessible Music Initiative'
    },
    {
      id: 3,
      name: 'River Thompson',
      medium: 'Performance Art',
      description: 'Queer performance artist challenging societal norms.',
      featured: 'Pride Month Showcase'
    }
  ]

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

        {/* Content Sections */}
        <div className="space-y-6">
          {/* Events Tab */}
          {activeTab === 'events' && (
            <div id="events">
              <h2 className="text-2xl font-bold mb-6">Upcoming Local Events</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localEvents.map((event) => (
                  <div key={event.id} className="card-glass group hover:scale-105 transition-transform duration-300">
                    <div className="flex items-start justify-between mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-sin-orange/20 text-sin-orange">
                        <Tag className="w-3 h-3 mr-1" />
                        {event.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                    <p className="text-foreground/60 text-sm mb-4">{event.description}</p>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2 text-foreground/70">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <Clock className="w-4 h-4" />
                        {event.time}
                      </div>
                      <div className="flex items-center gap-2 text-foreground/70">
                        <MapPin className="w-4 h-4" />
                        {event.location}
                      </div>
                    </div>
                    <button className="mt-4 text-sin-orange font-medium flex items-center gap-1 group-hover:gap-2 transition-all">
                      Learn More <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/events" className="btn-secondary inline-flex items-center gap-2">
                  View All Events <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Resources Tab */}
          {activeTab === 'resources' && (
            <div id="resources">
              <h2 className="text-2xl font-bold mb-6">Local Resources</h2>
              <div className="space-y-6">
                {localResources.map((resource) => (
                  <div key={resource.id} className="card-glass">
                    <div className="md:flex md:items-start md:justify-between">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{resource.name}</h3>
                        <p className="text-foreground/60 mb-4">{resource.description}</p>
                        <div className="mb-4">
                          <h4 className="text-sm font-medium mb-2">Services Offered:</h4>
                          <div className="flex flex-wrap gap-2">
                            {resource.services.map((service, index) => (
                              <span
                                key={index}
                                className="px-3 py-1 bg-muted rounded-full text-sm"
                              >
                                {service}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="mt-4 md:mt-0 md:ml-8">
                        <button className="btn-primary">
                          Contact: {resource.contact}
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/resources" className="btn-secondary inline-flex items-center gap-2">
                  View All Resources <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}

          {/* Artists Tab */}
          {activeTab === 'artists' && (
            <div id="artists">
              <h2 className="text-2xl font-bold mb-6">Featured Local Artists</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {localArtists.map((artist) => (
                  <div key={artist.id} className="card-glass group hover:scale-105 transition-transform duration-300">
                    <div className="aspect-square bg-gradient-to-br from-sin-orange/20 to-sin-yellow/20 rounded-lg mb-4 flex items-center justify-center">
                      <Users className="w-20 h-20 text-sin-orange/50" />
                    </div>
                    <h3 className="text-xl font-semibold mb-1">{artist.name}</h3>
                    <p className="text-sin-orange font-medium text-sm mb-3">{artist.medium}</p>
                    <p className="text-foreground/60 text-sm mb-3">{artist.description}</p>
                    <div className="pt-3 border-t border-border">
                      <p className="text-xs text-foreground/50">Featured in:</p>
                      <p className="text-sm font-medium">{artist.featured}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/artists" className="btn-secondary inline-flex items-center gap-2">
                  View All Artists <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
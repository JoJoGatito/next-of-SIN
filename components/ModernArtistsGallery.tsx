'use client'

import { useState } from 'react'
import { Star, ArrowRight } from 'lucide-react'

const artists = [
  {
    id: 1,
    name: "Jordan Rivera",
    medium: "Digital Art",
    bio: "Creating vibrant digital pieces that celebrate queer identity and culture.",
    featured: true,
    color: "from-purple-400 to-pink-600",
    height: "h-64"
  },
  {
    id: 2,
    name: "Alex Chen",
    medium: "Photography",
    bio: "Documenting the beauty and resilience of disabled communities.",
    featured: false,
    color: "from-blue-400 to-teal-600",
    height: "h-80"
  },
  {
    id: 3,
    name: "Maya Johnson",
    medium: "Mixed Media",
    bio: "Exploring themes of identity, heritage, and belonging through mixed media.",
    featured: true,
    color: "from-orange-400 to-red-600",
    height: "h-72"
  },
  {
    id: 4,
    name: "Sam Williams",
    medium: "Sculpture",
    bio: "Transforming recycled materials into powerful statements about sustainability.",
    featured: false,
    color: "from-green-400 to-emerald-600",
    height: "h-64"
  },
  {
    id: 5,
    name: "Taylor Martinez",
    medium: "Street Art",
    bio: "Bringing color and life to urban spaces with community-centered murals.",
    featured: true,
    color: "from-yellow-400 to-orange-600",
    height: "h-96"
  },
  {
    id: 6,
    name: "Morgan Lee",
    medium: "Performance Art",
    bio: "Breaking boundaries through immersive performance experiences.",
    featured: false,
    color: "from-indigo-400 to-purple-600",
    height: "h-56"
  }
]

export default function ModernArtistsGallery() {
  const [selectedArtist, setSelectedArtist] = useState<number | null>(null)
  const [filter, setFilter] = useState<'all' | 'featured'>('all')

  const filteredArtists = filter === 'all' 
    ? artists 
    : artists.filter(a => a.featured)

  return (
    <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Featured <span className="gradient-text">Artists</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8">
            Celebrating the creative voices of our community
          </p>
          
          {/* Filter tabs */}
          <div className="inline-flex bg-muted rounded-full p-1 mb-8">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                filter === 'all' 
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg' 
                  : 'text-muted-foreground'
              }`}
            >
              All Artists
            </button>
            <button
              onClick={() => setFilter('featured')}
              className={`px-6 py-2 rounded-full transition-all duration-300 ${
                filter === 'featured' 
                  ? 'bg-gradient-to-r from-sin-orange to-sin-yellow text-white shadow-lg' 
                  : 'text-muted-foreground'
              }`}
            >
              <Star className="inline w-4 h-4 mr-1" /> Featured
            </button>
          </div>
        </div>

        {/* Masonry grid */}
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {filteredArtists.map((artist, index) => (
            <div
              key={artist.id}
              className="break-inside-avoid group cursor-pointer"
              onClick={() => setSelectedArtist(selectedArtist === artist.id ? null : artist.id)}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:transform hover:scale-105 animate-fade-in">
                {/* Artwork placeholder with gradient */}
                <div className={`${artist.height} bg-gradient-to-br ${artist.color} relative`}>
                  {/* Overlay pattern */}
                  <div className="absolute inset-0 opacity-20">
                    <svg className="w-full h-full">
                      <pattern id={`pattern-${artist.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                        <circle cx="20" cy="20" r="1" fill="white" />
                      </pattern>
                      <rect width="100%" height="100%" fill={`url(#pattern-${artist.id})`} />
                    </svg>
                  </div>
                  
                  {/* Featured badge */}
                  {artist.featured && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full">
                      <span className="text-sin-orange font-bold text-sm flex items-center">
                        <Star className="w-4 h-4 mr-1" /> Featured
                      </span>
                    </div>
                  )}
                  
                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
                    selectedArtist === artist.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                  }`}>
                  <div className="text-center p-4 sm:p-6">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2">{artist.name}</h3>
                      <p className="text-sin-orange font-semibold mb-2 sm:mb-3 text-sm sm:text-base">{artist.medium}</p>
                      <p className="text-white/90 text-xs sm:text-sm mb-3 sm:mb-4">{artist.bio}</p>
                      <button className="px-4 sm:px-6 py-1.5 sm:py-2 bg-white/20 backdrop-blur border border-white/50 rounded-full text-white text-sm sm:text-base font-semibold hover:bg-white/30 transition-colors">
                        View Portfolio
                      </button>
                    </div>
                  </div>
                </div>
                
                {/* Artist info bar */}
                <div className="bg-card p-4 border-t border-border">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold text-foreground">{artist.name}</h4>
                      <p className="text-sm text-muted-foreground">{artist.medium}</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-sin-orange transform group-hover:rotate-45 transition-transform" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <div className="card-glass backdrop-blur-md bg-gradient-to-r from-sin-orange/10 to-sin-yellow/10 p-8 rounded-2xl inline-block">
            <h3 className="text-2xl font-bold mb-4">Are you an artist?</h3>
            <p className="text-muted-foreground mb-6">Join our creative community and showcase your work</p>
            <button className="btn-primary">
              Submit Your Art
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
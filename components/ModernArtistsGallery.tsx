'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'

const featuredArtist = {
  id: 1,
  name: "Jordan Rivera",
  medium: "Digital Art",
  bio: "Creating vibrant digital pieces that celebrate queer identity and culture.",
  color: "from-purple-400 to-pink-600",
  height: "h-96"
}

export default function ModernArtistsGallery() {
  const [showDetails, setShowDetails] = useState(false)

  return (
    <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Featured <span className="gradient-text">Artist</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Celebrating the creative voices of our community
          </p>
        </div>

        {/* Single Featured Artist Card */}
        <div 
          className="group cursor-pointer mx-auto max-w-2xl"
          onClick={() => setShowDetails(!showDetails)}
        >
          <div className="relative overflow-hidden rounded-2xl transition-all duration-500 hover:transform hover:scale-[1.02] animate-fade-in shadow-2xl">
            {/* Artwork placeholder with gradient */}
            <div className={`${featuredArtist.height} bg-gradient-to-br ${featuredArtist.color} relative`}>
              {/* Overlay pattern */}
              <div className="absolute inset-0 opacity-20">
                <svg className="w-full h-full">
                  <pattern id={`pattern-${featuredArtist.id}`} x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <circle cx="20" cy="20" r="1" fill="white" />
                  </pattern>
                  <rect width="100%" height="100%" fill={`url(#pattern-${featuredArtist.id})`} />
                </svg>
              </div>
              
              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center transition-opacity duration-300 ${
                showDetails ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
              }`}>
                <div className="text-center p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">{featuredArtist.name}</h3>
                  <p className="text-sin-orange font-semibold mb-3 text-base sm:text-lg">{featuredArtist.medium}</p>
                  <p className="text-white/90 text-sm sm:text-base mb-4 sm:mb-6 max-w-md mx-auto">{featuredArtist.bio}</p>
                  <button className="px-6 sm:px-8 py-2 sm:py-3 bg-white/20 backdrop-blur border border-white/50 rounded-full text-white text-sm sm:text-base font-semibold hover:bg-white/30 transition-colors">
                    View Portfolio
                  </button>
                </div>
              </div>
            </div>
            
            {/* Artist info bar */}
            <div className="bg-card p-6 border-t border-border">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-bold text-foreground text-lg">{featuredArtist.name}</h4>
                  <p className="text-sm text-muted-foreground">{featuredArtist.medium}</p>
                </div>
                <ArrowRight className="w-6 h-6 text-sin-orange transform group-hover:rotate-45 transition-transform" />
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
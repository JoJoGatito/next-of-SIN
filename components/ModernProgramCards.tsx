'use client'

import { useState } from 'react'
import { Rainbow, Heart, Accessibility, Utensils, Palette, ChevronDown, Users, Calendar } from 'lucide-react'

const programs = [
  {
    id: 1,
    title: "Sunstone Youth Group",
    slug: "sunstone-youth-group",
    description: "A safe and supportive space for LGBTQ+ youth to connect, learn, and grow together.",
    color: "from-orange-400 to-orange-600",
    icon: Rainbow,
    stats: "200+ youth served"
  },
  {
    id: 2,
    title: "Rock & Stone",
    slug: "rock-and-stone",
    description: "Building resilience and community through peer support and empowerment programs.",
    color: "from-yellow-400 to-amber-600",
    icon: Heart,
    stats: "50+ workshops"
  },
  {
    id: 3,
    title: "Dis'abitch",
    slug: "disabitch",
    description: "Celebrating and supporting the disabled community with pride, resources, and advocacy.",
    color: "from-red-400 to-red-600",
    icon: Accessibility,
    stats: "100+ advocates"
  },
  {
    id: 4,
    title: "Cafeteria Collective",
    slug: "cafeteria-collective",
    description: "Nourishing community through food justice, shared meals, and collective care.",
    color: "from-green-400 to-green-600",
    icon: Utensils,
    stats: "1000+ meals shared"
  },
  {
    id: 5,
    title: "Hue House",
    slug: "hue-house",
    description: "A vibrant space celebrating BIPOC artists, culture, and creative expression.",
    color: "from-purple-400 to-purple-600",
    icon: Palette,
    stats: "30+ artists featured"
  },
]

export default function ModernProgramCards() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  return (
    <div className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Our <span className="gradient-text">Programs</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Five pathways to inclusivity and community empowerment
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {programs.map((program, index) => {
            const isExpanded = expandedCard === program.id
            
            return (
              <div
                key={program.id}
                className={`relative transition-all duration-500 ease-in-out ${
                  isExpanded ? 'sm:col-span-2 lg:col-span-2' : ''
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <div 
                  className={`group relative h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                    isExpanded ? '' : 'hover:scale-105 hover:-translate-y-1'
                  }`}
                  onClick={() => toggleCard(program.id)}
                >
                  {/* Gradient accent line */}
                  <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color}`} />
                  
                  {/* Compact view - always visible */}
                  <div className={`p-4 ${isExpanded ? '' : ''}`}>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${program.color} bg-opacity-10`}>
                          <program.icon className="w-6 h-6 text-sin-orange" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-bold text-lg text-foreground leading-tight">
                            {program.title}
                          </h3>
                          {!isExpanded && (
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                              {program.description}
                            </p>
                          )}
                        </div>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                          isExpanded ? 'rotate-180' : ''
                        }`} 
                      />
                    </div>
                    
                    {/* Quick stats - visible when collapsed */}
                    {!isExpanded && (
                      <div className="flex items-center gap-4 mt-3">
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Users className="w-3 h-3" />
                          <span>{program.stats}</span>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  {/* Expanded content */}
                  <div className={`transition-all duration-500 ease-in-out overflow-hidden ${
                    isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-4 pb-4 space-y-4">
                      <p className="text-muted-foreground">
                        {program.description}
                      </p>
                      
                      {/* Detailed stats */}
                      <div className="flex flex-wrap gap-3">
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sin-orange/10 to-sin-yellow/10 rounded-full">
                          <Users className="w-4 h-4 text-sin-orange" />
                          <span className="text-sm font-medium text-foreground">{program.stats}</span>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sin-orange/10 to-sin-yellow/10 rounded-full">
                          <Calendar className="w-4 h-4 text-sin-orange" />
                          <span className="text-sm font-medium text-foreground">Weekly meetings</span>
                        </div>
                      </div>
                      
                      {/* Call to action buttons */}
                      <div className="flex flex-wrap gap-2 pt-2">
                        <button 
                          className="px-4 py-2 bg-gradient-to-r from-sin-orange to-sin-yellow text-white font-medium rounded-lg hover:shadow-md transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle learn more action
                          }}
                        >
                          Learn More
                        </button>
                        <button 
                          className="px-4 py-2 border border-sin-orange text-sin-orange font-medium rounded-lg hover:bg-sin-orange/10 transition-all duration-300"
                          onClick={(e) => {
                            e.stopPropagation()
                            // Handle join action
                          }}
                        >
                          Join Program
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
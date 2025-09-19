'use client'

import { useState } from 'react'
import { Rainbow, Heart, Accessibility, Utensils, Palette, ChevronDown, Calendar } from 'lucide-react'
import { AccessibleGradient } from './AccessibleGradient'

const programs = [
  {
    id: 1,
    title: "Sunstone Youth Group",
    slug: "sunstone-youth-group",
    description: "A safe and supportive space for LGBTQ+ youth to connect, learn, and grow together.",
    color: "from-orange-400 to-orange-600",
    icon: Rainbow,
    meetingFrequency: "Weekly meetings"
  },
  {
    id: 2,
    title: "Rock & Stone",
    slug: "rock-and-stone",
    description: "Inclusive outdoor and nature group that welcomes everyone who wants to explore and connect with the natural world. We organize various outdoor activities that cater to all skill levels and abilities.",
    color: "from-yellow-400 to-amber-600",
    icon: Heart,
    meetingFrequency: null
  },
  {
    id: 3,
    title: "Dis'abitch",
    slug: "disabitch",
    description: "A community that celebrates disability culture, advocates for accessibility, and creates spaces where disabled individuals can connect, share experiences, and build solidarity.",
    color: "from-red-400 to-red-600",
    icon: Accessibility,
    meetingFrequency: null
  },
  {
    id: 4,
    title: "Cafeteria Collective",
    slug: "cafeteria-collective",
    description: "Queer meet and greet where we can share stories, food, connections, and build community.",
    color: "from-green-400 to-green-600",
    icon: Utensils,
    meetingFrequency: null
  },
  {
    id: 5,
    title: "Hue House",
    slug: "hue-house",
    description: "A community of BIPOC focused discussions, meet & greets, and local events that celebrate the diversity of the queer community and it's allies.",
    color: "from-purple-400 to-purple-600",
    icon: Palette,
    meetingFrequency: "Monthly meetings"
  },
]

export default function ModernProgramCards() {
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  const toggleCard = (id: number) => {
    setExpandedCard(expandedCard === id ? null : id)
  }

  const selectedProgram = programs.find(p => p.id === expandedCard)

  return (
    <div className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Our <AccessibleGradient text="Programs" />
          </h2>
          <p className="text-muted-foreground text-lg">
            Five pathways to inclusivity and community empowerment
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-8">
          {programs.map((program, index) => {
            const isExpanded = expandedCard === program.id
            
            return (
              <div key={program.id}>
                {/* Card - always compact on desktop, expands on mobile */}
                <div
                  className={`relative transition-all duration-500 ease-in-out ${
                    // On mobile (sm and below), expand the card
                    isExpanded ? 'sm:col-span-2 lg:col-span-1' : ''
                  }`}
                  style={{
                    animationDelay: `${index * 50}ms`,
                  }}
                >
                  <div 
                    className={`group relative h-full bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl border border-border/50 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden ${
                      isExpanded ? 'ring-2 ring-sin-orange lg:ring-2' : 'hover:scale-105 hover:-translate-y-1'
                    }`}
                    onClick={() => toggleCard(program.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        toggleCard(program.id)
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-expanded={isExpanded}
                    aria-label={`${program.title} program card. ${isExpanded ? 'Expanded' : 'Click to expand'}`}
                  >
                    {/* Gradient accent line - hidden from screen readers */}
                    <div 
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${program.color}`}
                      aria-hidden="true"
                      role="presentation"
                    />
                    
                    {/* Compact view - always visible */}
                    <div className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center space-x-3">
                          <div 
                            className={`p-2 rounded-lg bg-gradient-to-br ${program.color} bg-opacity-10`}
                            aria-hidden="true"
                          >
                            <program.icon className="w-6 h-6 text-sin-orange" />
                          </div>
                          <div className="flex-1">
                            <h3 className="font-bold text-lg text-foreground leading-tight">
                              {program.title}
                            </h3>
                            {/* Show description on mobile when not expanded, always show on desktop */}
                            <p className={`text-sm text-muted-foreground mt-1 line-clamp-1 ${
                              !isExpanded ? 'block' : 'hidden lg:block'
                            }`}>
                              {program.description}
                            </p>
                          </div>
                        </div>
                        <ChevronDown 
                          className={`w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0 ${
                            isExpanded ? 'rotate-180' : ''
                          }`} 
                        />
                      </div>
                    </div>
                    
                    {/* Mobile expanded content - only show on mobile */}
                    <div className={`lg:hidden transition-all duration-500 ease-in-out overflow-hidden ${
                      isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                    }`}>
                      <div className="px-4 pb-4 space-y-4">
                        <p className="text-muted-foreground">
                          {program.description}
                        </p>
                        
                        {/* Meeting frequency */}
                        {program.meetingFrequency && (
                          <div className="flex flex-wrap gap-3">
                            <div 
                              className="flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-sin-orange/10 to-sin-yellow/10 rounded-full"
                            >
                              <Calendar className="w-4 h-4 text-sin-orange" />
                              <span className="text-sm font-medium text-foreground">{program.meetingFrequency}</span>
                            </div>
                          </div>
                        )}
                        
                        {/* Call to action buttons */}
                        <div className="flex flex-wrap gap-2 pt-2">
                          <button 
                            className="px-4 py-2 bg-gradient-to-r from-sin-orange to-sin-yellow text-white font-medium rounded-lg hover:shadow-md transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle learn more action
                            }}
                            aria-label={`Learn more about ${program.title}`}
                          >
                            Learn More
                          </button>
                          <button 
                            className="px-4 py-2 border border-sin-orange text-sin-orange font-medium rounded-lg hover:bg-sin-orange/10 transition-all duration-300"
                            onClick={(e) => {
                              e.stopPropagation()
                              // Handle join action
                            }}
                            aria-label={`Join ${program.title} program`}
                          >
                            Join Program
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop expanded content - shows below the grid */}
        {selectedProgram && (
          <div className="hidden lg:block transition-all duration-500 ease-in-out">
            <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur-md rounded-xl border border-border/50 shadow-lg p-6 mx-auto max-w-4xl">
              {/* Header */}
              <div className="flex items-center space-x-4 mb-6">
                <div 
                  className={`p-3 rounded-lg bg-gradient-to-br ${selectedProgram.color} bg-opacity-10`}
                  aria-hidden="true"
                >
                  <selectedProgram.icon className="w-8 h-8 text-sin-orange" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground">
                    {selectedProgram.title}
                  </h3>
                  <div 
                    className={`w-12 h-1 bg-gradient-to-r ${selectedProgram.color} rounded-full mt-2`}
                    aria-hidden="true"
                    role="presentation"
                  />
                </div>
              </div>
              
              {/* Content */}
              <div className="space-y-6">
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {selectedProgram.description}
                </p>
                
                {/* Meeting frequency */}
                {selectedProgram.meetingFrequency && (
                  <div className="flex flex-wrap gap-3">
                    <div 
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sin-orange/10 to-sin-yellow/10 rounded-full"
                    >
                      <Calendar className="w-5 h-5 text-sin-orange" />
                      <span className="text-base font-medium text-foreground">{selectedProgram.meetingFrequency}</span>
                    </div>
                  </div>
                )}
                
                {/* Call to action buttons */}
                <div className="flex flex-wrap gap-4 pt-2">
                  <button 
                    className="px-6 py-3 bg-gradient-to-r from-sin-orange to-sin-yellow text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle learn more action
                    }}
                    aria-label={`Learn more about ${selectedProgram.title}`}
                  >
                    Learn More
                  </button>
                  <button 
                    className="px-6 py-3 border-2 border-sin-orange text-sin-orange font-medium rounded-lg hover:bg-sin-orange/10 transition-all duration-300 hover:scale-105"
                    onClick={(e) => {
                      e.stopPropagation()
                      // Handle join action
                    }}
                    aria-label={`Join ${selectedProgram.title} program`}
                  >
                    Join Program
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

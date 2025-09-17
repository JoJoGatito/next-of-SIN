'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'

export default function ModernHeroSection() {
  const [isEnhanced, setIsEnhanced] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)

    // Enable enhancements after initial paint
    const enhanceTimer = setTimeout(() => {
      setIsEnhanced(true)
    }, 100)

    // Only add expensive listeners after enhancement and not on mobile
    const handleScroll = () => {
      if (isEnhanced && !isMobile) {
        requestAnimationFrame(() => setScrollY(window.scrollY))
      }
    }
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isEnhanced && !isMobile) {
        requestAnimationFrame(() => {
          setMousePosition({ x: e.clientX, y: e.clientY })
        })
      }
    }

    if (isEnhanced) {
      window.addEventListener('scroll', handleScroll, { passive: true })
      if (!isMobile) {
        window.addEventListener('mousemove', handleMouseMove, { passive: true })
      }
    }

    return () => {
      clearTimeout(enhanceTimer)
      window.removeEventListener('resize', checkMobile)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [isEnhanced, isMobile])

  return (
    <section className="relative min-h-[85vh] md:min-h-[90vh] lg:min-h-screen flex items-center justify-center overflow-hidden">
      {/* Static gradient background - always visible */}
      <div 
        className="absolute inset-0 bg-gradient-to-br from-sin-orange via-sin-yellow to-sin-red opacity-90 transition-transform duration-700 ease-out"
        style={{
          transform: isEnhanced && !isMobile ? `translateY(${scrollY * 0.5}px)` : 'none',
          willChange: isEnhanced ? 'transform' : 'auto'
        }}
      />
      
      {/* Floating elements with mouse parallax - only on desktop after enhancement */}
      {isEnhanced && !isMobile && (
        <div className="absolute inset-0 overflow-hidden opacity-0 animate-fade-in">
          <div 
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-white/10 rounded-full blur-2xl md:blur-3xl"
            style={{
              transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
              willChange: 'transform'
            }}
          />
          <div 
            className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/10 rounded-full blur-2xl md:blur-3xl"
            style={{
              transform: `translate(${-mousePosition.x * 0.03}px, ${-mousePosition.y * 0.03}px)`,
              willChange: 'transform'
            }}
          />
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className={`${isEnhanced ? 'backdrop-blur-xl' : 'backdrop-blur-md'} bg-gradient-to-br from-black/20 to-black/40 dark:from-black/30 dark:to-black/50 p-6 sm:p-8 md:p-12 rounded-2xl md:rounded-3xl ${isEnhanced ? 'animate-bounce-in' : ''} border border-white/30 shadow-2xl mx-4 sm:mx-0 transition-all duration-500`}>
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-bold mb-4 md:mb-6 ${isEnhanced ? 'animate-slide-in-left' : ''}`}>
            <span className="block text-white" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)' }}>Sunstone</span>
            <span className="block text-white text-2xl sm:text-3xl md:text-4xl lg:text-6xl mt-2" style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5), 0 0 20px rgba(0,0,0,0.3)' }}>Inclusivity Network</span>
          </h1>
          
          <p className={`text-base sm:text-lg md:text-xl lg:text-2xl mb-8 md:mb-12 text-white max-w-3xl mx-auto ${isEnhanced ? 'animate-slide-in-right' : ''} px-4 sm:px-0`} style={{ textShadow: '1px 1px 3px rgba(0,0,0,0.5)' }}>
            Building bridges of support and celebration for 
            <span className="font-bold"> queer</span>,
            <span className="font-bold"> disabled</span>, and
            <span className="font-bold"> BIPOC</span> communities
          </p>

          {/* Call to action buttons - visible immediately */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8">
            <button className="px-6 py-3 bg-white text-sin-orange font-semibold rounded-lg hover:bg-white/90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105">
              Get Involved
            </button>
            <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white/10 transition-all duration-300">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Animated scroll indicator - only show after enhancement and on desktop */}
        {isEnhanced && !isMobile && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce opacity-0 animate-fade-in animation-delay-1000">
            <ChevronDown className="w-6 h-6 text-white/70" />
          </div>
        )}
      </div>

      {/* Rainbow accent bar */}
      <div className={`absolute bottom-0 left-0 right-0 h-2 bg-rainbow-gradient ${isEnhanced ? 'rainbow-bar' : ''} transition-opacity duration-500`} />
    </section>
  )
}

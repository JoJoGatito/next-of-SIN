'use client'

import { useState, useEffect } from 'react'
import { ChevronDown } from 'lucide-react'
import Image from 'next/image'

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
      {/* Animated gradient background - always visible */}
      <div 
        className="absolute inset-0 opacity-95 transition-transform duration-700 ease-out"
        style={{
          background: 'linear-gradient(-45deg, #000000, #450a0a, #991b1b, #000000, #7f1d1d, #450a0a)',
          backgroundSize: '400% 400%',
          animation: 'gradientShift 15s ease infinite',
          transform: isEnhanced && !isMobile ? `translateY(${scrollY * 0.5}px)` : 'none',
          willChange: isEnhanced ? 'transform, background-position' : 'auto'
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

      {/* Banner and Title Background */}
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
        {/* Title Text */}
        <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 ${isEnhanced ? 'animate-slide-in-left' : ''}`}>
          <span className="text-white" style={{ textShadow: '3px 3px 6px rgba(0,0,0,0.7), 0 0 30px rgba(0,0,0,0.5)' }}>
            Sunstone Inclusivity Network
          </span>
        </h1>
        
        {/* Banner */}
        <Image
          src="/assets/images/banner/sinbanner.webp"
          alt="Sunstone Inclusivity Network"
          width={1200}
          height={400}
          className={`object-contain w-full h-auto max-w-5xl opacity-90 ${isEnhanced ? 'animate-fade-in' : ''}`}
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 text-center">
        <div className="mt-64 md:mt-72 lg:mt-80">
          <p className={`text-lg sm:text-xl md:text-2xl lg:text-3xl mb-8 md:mb-12 text-white max-w-3xl mx-auto ${isEnhanced ? 'animate-slide-in-right' : ''} px-4 sm:px-0 font-semibold`} style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.7), 0 0 20px rgba(0,0,0,0.5)' }}>
            Building bridges of support and celebration for 
            <span className="font-bold text-sin-yellow"> queer</span>,
            <span className="font-bold text-sin-yellow"> disabled</span>, and
            <span className="font-bold text-sin-yellow"> BIPOC</span> communities
          </p>
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

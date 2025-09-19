'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { Sun, Moon, Home, Users, Heart, Calendar, MapPin } from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme, isReady } = useTheme()
  
  // Theme state changes are handled by useEffect
  useEffect(() => {
  }, [theme, isReady])
  const sliderRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const currentX = useRef(0)
  const lastScrollY = useRef(0)

  const toggleTheme = () => {
    // Only toggle if the theme provider is ready
    if (!isReady) return
    
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }

  const navLinks = [
    { href: '/', label: 'HOME', icon: Home },
    { href: '/about', label: 'ABOUT', icon: Users },
    { href: '/events', label: 'EVENTS', icon: Calendar },
    { href: '/donate', label: 'DONATE', icon: Heart },
    { href: '/local', label: 'LOCAL', icon: MapPin },
  ]

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      
      // Basic scroll detection
      setIsScrolled(currentScrollY > 20)
      
      // Collapse to logo when scrolling down past 100px
      // Expand when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsCollapsed(true)
      } else if (currentScrollY < lastScrollY.current) {
        setIsCollapsed(false)
      }
      
      // Always expand if at the top
      if (currentScrollY < 50) {
        setIsCollapsed(false)
      }
      
      lastScrollY.current = currentScrollY
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setActiveLink(pathname)
    // Set slider position based on current path
    const currentIndex = navLinks.findIndex(link => link.href === pathname)
    if (currentIndex !== -1) {
      setSliderPosition(currentIndex)
    }
  }, [pathname])

  // Determine if nav should be expanded (either not collapsed, or collapsed but hovered)
  const isExpanded = !isCollapsed || isHovered

  return (
    <>
      {/* Desktop Floating Navigation */}
      <nav className="hidden md:block fixed top-3 left-3 z-50 transition-all duration-500">
        <div 
          ref={navRef}
          className={`
            floating-nav relative flex items-center
            ${isScrolled ? 'nav-scrolled' : ''}
            ${isCollapsed && !isHovered ? 'nav-collapsed px-1 py-1' : 'px-2 py-2'}
            transition-all duration-500 ease-in-out overflow-hidden
          `}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Logo - Always visible */}
          <Link 
            href="/" 
            className={`nav-logo-wrapper p-1.5 rounded-full transition-all duration-300 ${isCollapsed && !isHovered ? 'nav-logo-collapsed' : ''}`}
            aria-label="Sunstone Inclusivity Network Home"
          >
            <Image
              src="/assets/images/logo/sun-only-logo.webp"
              alt="Sunstone Inclusivity Network Logo - Home"
              width={44}
              height={44}
              className="w-11 h-11 transition-transform duration-300"
              priority
            />
          </Link>

          {/* Navigation elements - hidden when collapsed */}
          <div className={`
            nav-collapsible-content flex items-center gap-2 overflow-hidden
            transition-all duration-500 ease-in-out
            ${isExpanded ? 'max-w-[600px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'}
          `}>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navLinks.slice(1).map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`
                    nav-link relative px-5 py-2.5 rounded-full font-medium text-sm tracking-wide
                    transition-all duration-300 overflow-hidden
                    ${activeLink === link.href ? 'nav-link-active' : ''}
                  `}
                  onMouseEnter={() => setActiveLink(link.href)}
                  onMouseLeave={() => setActiveLink(pathname)}
                >
                  <span className="relative z-10">{link.label}</span>
                  <div className="nav-link-bg" />
                </Link>
              ))}
            </div>

            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="theme-toggle p-3 rounded-full transition-all duration-300"
              aria-label="Toggle theme"
              style={{ touchAction: 'manipulation' }}
            >
              <div className="relative w-5 h-5">
                <Sun className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
                <Moon className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${theme === 'dark' ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation with Slider */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="mobile-nav-wrapper">
          <div 
            ref={sliderRef}
            className="mobile-nav-slider-container"
            onTouchStart={(e) => {
              // Don't check isReady here - allow touch events regardless of theme state
              e.stopPropagation() // Prevent event from being captured by parent elements
              setIsDragging(true)
              startX.current = e.touches[0].clientX
              currentX.current = sliderPosition
            }}
            onTouchMove={(e) => {
              // Only check if we're dragging and have a valid ref, not theme readiness
              if (!isDragging || !sliderRef.current) {
                return
              }
              
              e.stopPropagation()
              
              const diff = e.touches[0].clientX - startX.current
              const containerWidth = sliderRef.current.offsetWidth
              const itemWidth = containerWidth / navLinks.length
              const newPosition = currentX.current + (diff / itemWidth)
              
              // Clamp between 0 and navLinks.length - 1
              const clampedPosition = Math.max(0, Math.min(navLinks.length - 1, newPosition))
              setSliderPosition(clampedPosition)
            }}
            onTouchEnd={(e) => {
              // Only check if we're dragging, not theme readiness
              if (!isDragging) {
                return
              }

              e.stopPropagation()
              setIsDragging(false)

              // Snap to nearest position
              const nearestIndex = Math.round(sliderPosition)
              setSliderPosition(nearestIndex)

              // Navigate to the page
              router.push(navLinks[nearestIndex].href)
            }}
          >
            {/* Slider Track Background */}
            <div className="mobile-nav-track" />
            
            {/* Sliding Indicator */}
            <div 
              className="mobile-nav-slider"
              style={{
                left: `${(sliderPosition / navLinks.length) * 100}%`,
                width: `${100 / navLinks.length}%`,
                transition: isDragging ? 'none' : 'left 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            />
            
            {/* Navigation Items */}
            <div className="mobile-nav-items">
              {navLinks.map((link, index) => {
                const Icon = link.icon
                const isActive = index === Math.round(sliderPosition)
                return (
                  <button
                    key={link.href}
                    onClick={(e) => {
                      e.stopPropagation()
                      setSliderPosition(index)
                      router.push(link.href)
                    }}
                    className={`
                      mobile-nav-item flex flex-col items-center justify-center
                      transition-all duration-300
                      ${isActive ? 'mobile-nav-item-active' : ''}
                    `}
                  >
                    <Icon className={`w-4 h-4 transition-all duration-300 ${isActive ? 'scale-110' : 'scale-90 opacity-60'}`} />
                    <span className={`text-[9px] mt-0.5 font-medium transition-all duration-300 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                      {link.label}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>
          
          {/* Theme Toggle - Separate from slider */}
          <button
            onClick={(e) => {
              toggleTheme()
            }}
            className="mobile-theme-toggle flex items-center justify-center"
            aria-label="Toggle theme"
            style={{ touchAction: 'manipulation' }}
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <Sun className={`absolute w-6 h-6 transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              <Moon className={`absolute w-6 h-6 transition-all duration-300 ${theme === 'dark' ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
            </div>
          </button>
        </div>
      </nav>
    </>
  )
}

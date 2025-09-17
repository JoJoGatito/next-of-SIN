'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { useTheme } from './ThemeProvider'
import { Sun, Moon, Home, Users, Heart, Calendar, MapPin } from 'lucide-react'

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const sliderRef = useRef<HTMLDivElement>(null)
  const startX = useRef(0)
  const currentX = useRef(0)

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
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
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
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

  return (
    <>
      {/* Desktop Floating Navigation */}
      <nav className="hidden md:block fixed top-8 left-1/2 transform -translate-x-1/2 z-50 transition-all duration-500">
        <div className={`
          floating-nav relative flex items-center gap-2 px-2 py-2
          ${isScrolled ? 'nav-scrolled' : ''}
        `}>
          {/* Logo */}
          <Link 
            href="/" 
            className="nav-logo-wrapper p-3 rounded-full transition-all duration-300"
            aria-label="Sunstone Inclusivity Network Home"
          >
            <Image
              src="/assets/images/logo/sun-only-logo.webp"
              alt="SIN"
              width={32}
              height={32}
              className="w-8 h-8 transition-transform duration-300"
              priority
            />
          </Link>

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
          >
            <div className="relative w-5 h-5">
              <Sun className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`} />
              <Moon className={`absolute inset-0 w-5 h-5 transition-all duration-300 ${theme === 'dark' ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'}`} />
            </div>
          </button>
        </div>
      </nav>

      {/* Mobile Bottom Navigation with Slider */}
      <nav className="md:hidden fixed bottom-4 left-4 right-4 z-50">
        <div className="mobile-nav-wrapper">
          <div 
            ref={sliderRef}
            className="mobile-nav-slider-container"
            onTouchStart={(e) => {
              setIsDragging(true)
              startX.current = e.touches[0].clientX
              currentX.current = sliderPosition
            }}
            onTouchMove={(e) => {
              if (!isDragging || !sliderRef.current) return
              
              const diff = e.touches[0].clientX - startX.current
              const containerWidth = sliderRef.current.offsetWidth
              const itemWidth = containerWidth / navLinks.length
              const newPosition = currentX.current + (diff / itemWidth)
              
              // Clamp between 0 and navLinks.length - 1
              const clampedPosition = Math.max(0, Math.min(navLinks.length - 1, newPosition))
              setSliderPosition(clampedPosition)
            }}
            onTouchEnd={() => {
              if (!isDragging) return
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
                    onClick={() => {
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
            onClick={toggleTheme}
            className="mobile-theme-toggle flex items-center justify-center"
            aria-label="Toggle theme"
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

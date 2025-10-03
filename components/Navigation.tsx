'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { createPortal } from 'react-dom'
import { useTheme } from './ThemeProvider'
import { Sun, Moon, Home, Users, Heart, Calendar, MapPin, BookOpen } from 'lucide-react'
import PeekStrip from './PeekStrip'

const navLinks = [
  { href: '/', label: 'HOME', icon: Home },
  { href: '/about', label: 'ABOUT', icon: Users },
  { href: '/programs', label: 'PROGRAMS', icon: BookOpen },
  { href: '/events', label: 'EVENTS', icon: Calendar },
  { href: '/local', label: 'LOCAL', icon: MapPin },
]
 
const programPages = [
  { href: '/programs/sunstone-youth-group', label: 'Sunstone Youth Group' },
  { href: '/programs/rock-and-stone', label: 'Rock & Stone' },
  { href: '/programs/hue-house', label: 'Hue House' },
]

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [activeLink, setActiveLink] = useState('')
  const [sliderPosition, setSliderPosition] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [programsOpen, setProgramsOpen] = useState(false)
  const [mobileProgramsOpen, setMobileProgramsOpen] = useState(false)
  const [peekOpen, setPeekOpen] = useState(false)
  const [portalEl, setPortalEl] = useState<HTMLElement | null>(null)
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
  const peekTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // Hover-intent management for Programs dropdown
  const closeProgramsTimeout = useRef<number | null>(null)

  const openPrograms = () => {
    if (closeProgramsTimeout.current != null) {
      window.clearTimeout(closeProgramsTimeout.current)
      closeProgramsTimeout.current = null
    }
    setProgramsOpen(true)
  }

  const scheduleClosePrograms = (delay = 200) => {
    if (closeProgramsTimeout.current != null) {
      window.clearTimeout(closeProgramsTimeout.current)
    }
    closeProgramsTimeout.current = window.setTimeout(() => {
      setProgramsOpen(false)
    }, delay)
  }

  // Cleanup any pending timeouts on unmount
  useEffect(() => {
    return () => {
      if (closeProgramsTimeout.current != null) {
        window.clearTimeout(closeProgramsTimeout.current)
      }
      if (peekTimeoutRef.current) {
        clearTimeout(peekTimeoutRef.current)
      }
    }
  }, [])

  // Resolve portal mount target on client only
  useEffect(() => {
    const el = document.getElementById('peek-strip-portal') as HTMLElement | null
    setPortalEl(el)
    console.log('[Nav] portal target found:', !!el)
  }, [])

  // PeekStrip handlers
  const closePeekStrip = useCallback(() => {
    setPeekOpen(false)
    if (peekTimeoutRef.current) {
      clearTimeout(peekTimeoutRef.current)
      peekTimeoutRef.current = null
    }
  }, [])

  const openPeekStrip = useCallback(() => {
    setPeekOpen(true)
    if (peekTimeoutRef.current) {
      clearTimeout(peekTimeoutRef.current)
    }
    // 3 second auto-retract
    peekTimeoutRef.current = setTimeout(() => {
      setPeekOpen(false)
    }, 3000)
  }, [])

  const toggleTheme = () => {
    // Only toggle if the theme provider is ready
    if (!isReady) return
    
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
  }


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
    // Map nested routes to their top-level nav parent for highlighting/slider
    const resolveNavForPath = (path: string) => {
      // exact home
      if (path === '/') return '/'
      // exact match first
      const exact = navLinks.find(l => l.href === path)
      if (exact) return exact.href
      // nested match: treat /about/*, /programs/*, /events/*, /local/* as their parent
      const parent = navLinks.find(
        l => l.href !== '/' && (path === l.href || path.startsWith(`${l.href}/`))
      )
      return parent?.href ?? '/'
    }

    const active = resolveNavForPath(pathname)
    setActiveLink(active)

    const index = navLinks.findIndex(l => l.href === active)
    if (index !== -1) {
      setSliderPosition(index)
    }
  }, [pathname])

  // Handle escape key to close dropdown
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && programsOpen) {
        setProgramsOpen(false)
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [programsOpen])

  // Instrumentation: log programsOpen transitions
  useEffect(() => {
    console.log('[Nav] programsOpen changed:', programsOpen)
  }, [programsOpen])

  // Close PeekStrip on route change
  useEffect(() => {
    const handleRouteChange = () => {
      closePeekStrip()
    }

    // Listen for popstate events (browser back/forward)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  // Close PeekStrip on scroll (desktop only to avoid mobile tap causing immediate close)
  useEffect(() => {
    const handleScroll = () => {
      // Only close on desktop
      if (window.matchMedia && window.matchMedia('(min-width: 768px)').matches) {
        if (peekOpen) {
          closePeekStrip()
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [peekOpen, closePeekStrip])


  // Determine if nav should be expanded (either not collapsed, or hovered, or dropdown open)
  const isExpanded = !isCollapsed || isHovered || programsOpen
  
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
            transition-all duration-500 ease-in-out ${programsOpen ? 'overflow-visible' : 'overflow-hidden'}
          `}
          onMouseEnter={() => { console.log('[Nav] wrapper mouseenter'); setIsHovered(true) }}
          onMouseLeave={() => { console.log('[Nav] wrapper mouseleave'); setIsHovered(false) }}
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
            nav-collapsible-content flex items-center gap-2 ${programsOpen ? 'overflow-visible' : 'overflow-hidden'}
            transition-all duration-500 ease-in-out
            ${isExpanded ? 'max-w-[600px] opacity-100 ml-2' : 'max-w-0 opacity-0 ml-0'}
          `}>
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-600 mx-1" />

            {/* Navigation Links */}
            <div className="flex items-center gap-1">
              {navLinks.slice(1).map((link) => {
                const isPrograms = link.href === '/programs'
                if (isPrograms) {
                  return (
                    <div
                      key={link.href}
                      className="relative"
                      onMouseEnter={() => { console.log('[Nav] programs container mouseenter'); setActiveLink(link.href); openPrograms() }}
                      onMouseLeave={() => { console.log('[Nav] programs container mouseleave'); setActiveLink(pathname); scheduleClosePrograms(200) }}
                    >
                      <button
                        onClick={(e) => {
                          e.preventDefault()
                          console.log('[Nav] programs button click toggle peek strip')
                          const willOpen = !peekOpen
                          if (willOpen) {
                            openPeekStrip()
                          } else {
                            closePeekStrip()
                          }
                        }}
                        className={`
                          nav-link relative px-5 py-2.5 rounded-full font-medium text-sm tracking-wide
                          transition-all duration-300 overflow-hidden
                          ${activeLink === link.href ? 'nav-link-active' : ''}
                        `}
                        aria-haspopup="menu"
                        aria-expanded={peekOpen}
                        aria-controls="peek-strip"
                      >
                        <span className="relative z-10">{link.label}</span>
                        <div className="nav-link-bg" />
                      </button>

                      <div
                        id="programs-menu"
                        className={`
                          absolute left-0 top-full mt-0 w-64 z-[60]
                          bg-white dark:bg-gray-900 border border-border/50 rounded-xl shadow-lg overflow-hidden
                          transition-all duration-200
                          ${programsOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-2 pointer-events-none'}
                        `}
                        role="menu"
                        aria-label="Programs menu"
                        onMouseEnter={() => { console.log('[Nav] programs menu mouseenter'); openPrograms() }}
                        onMouseLeave={() => { console.log('[Nav] programs menu mouseleave'); scheduleClosePrograms(200) }}
                      >
                        <div className="py-2">
                          {programPages.map((p) => (
                            <Link
                              key={p.href}
                              href={p.href}
                              className="block px-4 py-2.5 text-sm font-medium text-foreground hover:bg-sin-orange/10"
                              onClick={() => setProgramsOpen(false)}
                              role="menuitem"
                            >
                              {p.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                }
                return (
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
                )
              })}
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
                      const isPrograms = link.href === '/programs'

                      if (isPrograms) {
                        openPeekStrip()
                        return
                      }

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

      {/* Mobile Programs Bottom Sheet */}
      {mobileProgramsOpen && (
        <div className="md:hidden fixed inset-0 z-[60]">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileProgramsOpen(false)}
          />

          {/* Bottom Sheet */}
          <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-border rounded-t-3xl shadow-2xl">
            {/* Handle bar */}
            <div className="flex justify-center py-3">
              <div className="w-10 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
            </div>

            {/* Header */}
            <div className="px-6 pb-4">
              <h3 className="text-lg font-semibold text-center text-foreground">Programs</h3>
            </div>

            {/* Program Links */}
            <div className="px-6 pb-6">
              <div className="space-y-1">
                {programPages.map((program) => (
                  <Link
                    key={program.href}
                    href={program.href}
                    className="block px-4 py-3 text-sm font-medium text-foreground hover:bg-sin-orange/10 rounded-lg transition-colors"
                    onClick={() => setMobileProgramsOpen(false)}
                  >
                    {program.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* PeekStrip Portal */}
      {portalEl && createPortal(
        <PeekStrip
          isOpen={peekOpen}
          onClose={closePeekStrip}
          position="mobile"
        />,
        portalEl
      )}
    </>
  )
}

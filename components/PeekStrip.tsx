'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface PeekStripProps {
  isOpen: boolean
  onClose: () => void
  position: 'desktop' | 'mobile'
}

const programs = [
  { href: '/programs/hue-house', label: 'Hue House' },
  { href: '/programs/rock-and-stone', label: 'Rock and Stone' },
  { href: '/programs/sunstone-youth-group', label: 'Sunstone Youth Group' }
]

export default function PeekStrip({ isOpen, onClose, position }: PeekStripProps) {
  const [focusedIndex, setFocusedIndex] = useState(0)
  const router = useRouter()
  const safeNavigate = useCallback((href: string) => {
    try {
      const fallback = window.setTimeout(() => {
        if (window.location.pathname !== href) {
          window.location.assign(href)
        }
      }, 700)
      router.push(href)
      // If path changed quickly, cancel the fallback
      window.setTimeout(() => {
        if (window.location.pathname === href) {
          clearTimeout(fallback)
        }
      }, 150)
    } catch (_err) {
      window.location.assign(href)
    }
  }, [router])
  const containerRef = useRef<HTMLDivElement>(null)
  const autoCloseTimeoutRef = useRef<number | null>(null)
  const chipsRefs = useRef<(HTMLAnchorElement | null)[]>([])

  // Auto-retract after 3 seconds of inactivity
  const startAutoCloseTimer = useCallback(() => {
    if (autoCloseTimeoutRef.current) {
      window.clearTimeout(autoCloseTimeoutRef.current)
    }
    autoCloseTimeoutRef.current = window.setTimeout(() => {
      onClose()
    }, 3000)
  }, [onClose])

  const resetAutoCloseTimer = useCallback(() => {
    startAutoCloseTimer()
  }, [startAutoCloseTimer])

  const stopAutoCloseTimer = useCallback(() => {
    if (autoCloseTimeoutRef.current) {
      window.clearTimeout(autoCloseTimeoutRef.current)
      autoCloseTimeoutRef.current = null
    }
  }, [])

  // Focus management
  const focusChip = useCallback((index: number) => {
    setFocusedIndex(index)
    if (chipsRefs.current[index]) {
      chipsRefs.current[index]?.focus()
    }
  }, [])

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!isOpen) return

    switch (e.key) {
      case 'ArrowLeft':
      case 'ArrowUp':
        e.preventDefault()
        const prevIndex = focusedIndex > 0 ? focusedIndex - 1 : programs.length - 1
        focusChip(prevIndex)
        break
      case 'ArrowRight':
      case 'ArrowDown':
        e.preventDefault()
        const nextIndex = focusedIndex < programs.length - 1 ? focusedIndex + 1 : 0
        focusChip(nextIndex)
        break
      case 'Home':
        e.preventDefault()
        focusChip(0)
        break
      case 'End':
        e.preventDefault()
        focusChip(programs.length - 1)
        break
      case 'Escape':
        e.preventDefault()
        onClose()
        break
      case 'Enter':
      case ' ':
        e.preventDefault()
        if (chipsRefs.current[focusedIndex]) {
          chipsRefs.current[focusedIndex]?.click()
        }
        break
    }
  }, [isOpen, focusedIndex, focusChip, onClose])

  // Set up focus and timer management when opened
  useEffect(() => {
    if (isOpen) {
      // Focus first chip
      setTimeout(() => focusChip(0), 50)
      // Start auto-close timer
      startAutoCloseTimer()
    } else {
      stopAutoCloseTimer()
    }

    return () => stopAutoCloseTimer()
  }, [isOpen, focusChip, startAutoCloseTimer, stopAutoCloseTimer])

  // Keyboard event listeners
  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  // Handle program selection
  const handleProgramSelect = useCallback(() => {
    onClose()
  }, [onClose])

  // Handle interactions within the strip
  const handleInteraction = useCallback(() => {
    resetAutoCloseTimer()
  }, [resetAutoCloseTimer])

  // Position-based styling
  const containerClasses = position === 'desktop'
    ? 'absolute bottom-full left-0 w-64 mb-2'
    : 'fixed left-0 right-0 bottom-20 mx-4 z-[70] pointer-events-auto'

  if (!isOpen) return null

  return (
    <div
      ref={containerRef}
      className={containerClasses}
      role="menu"
      aria-label="Programs menu"
      onMouseEnter={handleInteraction}
      onMouseLeave={handleInteraction}
    >
      <div
        className={`
          bg-white/80 dark:bg-gray-900/80 backdrop-blur-md
          border border-border/50 rounded-xl shadow-lg
          transition-all duration-200 ease-out
          ${isOpen ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-2 scale-95'}
          animate-in slide-in-from-bottom-2 fade-in
        `}
        style={{
          animationDuration: '200ms',
          animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        {/* Scrollable container for programs */}
        <div className="max-h-48 overflow-y-auto py-2">
          <div className="flex flex-col gap-1 px-2">
            {programs.map((program, index) => (
              <Link
                key={program.href}
                ref={(el) => { chipsRefs.current[index] = el }}
                href={program.href}
                onClick={(e) => { e.preventDefault(); handleProgramSelect(); safeNavigate(program.href) }}
                onMouseEnter={handleInteraction}
                onFocus={handleInteraction}
                className={`
                  px-4 py-3 rounded-lg text-sm font-medium
                  text-foreground hover:bg-sin-orange/10
                  focus:bg-sin-orange/10 focus:outline-none
                  transition-all duration-200
                  ${focusedIndex === index ? 'bg-sin-orange/10 ring-2 ring-sin-orange/20' : ''}
                  ${position === 'mobile' ? 'touch-manipulation min-h-[44px] flex items-center' : ''}
                `}
                role="menuitem"
                tabIndex={focusedIndex === index ? 0 : -1}
                aria-current={focusedIndex === index ? 'true' : 'false'}
              >
                {program.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Visual indicator for mobile */}
        {position === 'mobile' && (
          <div className="flex justify-center py-2 border-t border-border/30">
            <div className="w-8 h-1 bg-gray-300 dark:bg-gray-600 rounded-full" />
          </div>
        )}
      </div>

      <style jsx>{`
        .animate-in {
          animation-fill-mode: both;
        }

        .slide-in-from-bottom-2 {
          animation-name: slide-in-from-bottom-2;
        }

        .fade-in {
          animation-name: fade-in;
        }

        @keyframes slide-in-from-bottom-2 {
          from {
            opacity: 0;
            transform: translateY(0.5rem);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        /* Hide scrollbar but keep functionality */
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }
        .overflow-y-auto {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  )
}
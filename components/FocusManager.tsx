'use client'

import {
  useEffect,
  useRef,
  useCallback,
  createContext,
  useContext,
  ReactNode,
  useState
} from 'react'

// Types for focus management
interface FocusRestorePoint {
  element: Element
  scrollPosition?: { x: number; y: number }
}

interface FocusTrapOptions {
  isActive: boolean
  restoreFocus?: boolean
  onEscape?: () => void
}

// Context for global focus management
interface FocusContextValue {
  restoreFocus: (point?: FocusRestorePoint) => void
  saveFocus: () => FocusRestorePoint | null
  trapFocus: (container: HTMLElement, options?: FocusTrapOptions) => () => void
}

const FocusContext = createContext<FocusContextValue | null>(null)

/**
 * Provider for global focus management
 */
export function FocusProvider({ children }: { children: ReactNode }) {
  const previousFocusRef = useRef<Element | null>(null)
  const [trappedContainer, setTrappedContainer] = useState<HTMLElement | null>(null)
  const [trapOptions, setTrapOptions] = useState<FocusTrapOptions | null>(null)

  // Save current focus point
  const saveFocus = useCallback((): FocusRestorePoint | null => {
    if (document.activeElement) {
      previousFocusRef.current = document.activeElement
      return {
        element: document.activeElement,
        scrollPosition: { x: window.scrollX, y: window.scrollY }
      }
    }
    return null
  }, [])

  // Restore focus to saved point
  const restoreFocus = useCallback((point?: FocusRestorePoint) => {
    const element = point?.element || previousFocusRef.current
    if (element && 'focus' in element) {
      // Use setTimeout to ensure DOM is ready
      setTimeout(() => {
        (element as HTMLElement).focus()
        if (point?.scrollPosition) {
          window.scrollTo(point.scrollPosition.x, point.scrollPosition.y)
        }
      }, 0)
    }
    setTrappedContainer(null)
    setTrapOptions(null)
  }, [])

  // Trap focus within a container
  const trapFocus = useCallback((container: HTMLElement, options: FocusTrapOptions = { isActive: true }) => {
    setTrappedContainer(container)
    setTrapOptions(options)

    // Focus first focusable element
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )
    const firstFocusable = focusableElements[0] as HTMLElement
    if (firstFocusable) {
      firstFocusable.focus()
    }

    // Return cleanup function
    return () => {
      setTrappedContainer(null)
      setTrapOptions(null)
      if (options.restoreFocus !== false) {
        restoreFocus()
      }
    }
  }, [restoreFocus])

  // Handle keyboard navigation when focus is trapped
  useEffect(() => {
    if (!trappedContainer || !trapOptions?.isActive) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        const focusableElements = Array.from(trappedContainer.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        )).filter(el => !el.hasAttribute('disabled')) as HTMLElement[]

        if (focusableElements.length === 0) return

        const currentIndex = focusableElements.indexOf(document.activeElement as HTMLElement)

        if (event.shiftKey) {
          // Shift + Tab (previous)
          if (currentIndex <= 0) {
            event.preventDefault()
            focusableElements[focusableElements.length - 1]?.focus()
          }
        } else {
          // Tab (next)
          if (currentIndex >= focusableElements.length - 1) {
            event.preventDefault()
            focusableElements[0]?.focus()
          }
        }
      } else if (event.key === 'Escape' && trapOptions.onEscape) {
        trapOptions.onEscape()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [trappedContainer, trapOptions])

  const contextValue: FocusContextValue = {
    restoreFocus,
    saveFocus,
    trapFocus
  }

  return (
    <FocusContext.Provider value={contextValue}>
      {children}
    </FocusContext.Provider>
  )
}

/**
 * Hook to use global focus management
 */
export function useFocus() {
  const context = useContext(FocusContext)
  if (!context) {
    throw new Error('useFocus must be used within a FocusProvider')
  }
  return context
}

/**
 * Hook for managing focus restoration in components
 */
export function useFocusRestore() {
  const { saveFocus, restoreFocus } = useFocus()
  const savedFocusRef = useRef<FocusRestorePoint | null>(null)

  const saveCurrentFocus = useCallback(() => {
    savedFocusRef.current = saveFocus()
  }, [saveFocus])

  const restoreCurrentFocus = useCallback(() => {
    if (savedFocusRef.current) {
      restoreFocus(savedFocusRef.current)
      savedFocusRef.current = null
    }
  }, [restoreFocus])

  useEffect(() => {
    // Save focus on mount
    saveCurrentFocus()

    // Restore focus on unmount
    return () => {
      restoreCurrentFocus()
    }
  }, [saveCurrentFocus, restoreCurrentFocus])

  return { saveFocus: saveCurrentFocus, restoreFocus: restoreCurrentFocus }
}

/**
 * Hook for focus trapping in modal-like components
 */
export function useFocusTrap(isActive: boolean = true, onEscape?: () => void) {
  const { trapFocus } = useFocus()
  const containerRef = useRef<HTMLDivElement>(null)

  const startTrap = useCallback(() => {
    if (containerRef.current) {
      return trapFocus(containerRef.current, { isActive, onEscape })
    }
  }, [trapFocus, isActive, onEscape])

  const stopTrap = useCallback(() => {
    if (containerRef.current) {
      // The cleanup function from trapFocus will handle restoration
      setTrappedContainer(null)
      setTrapOptions(null)
    }
  }, [])

  useEffect(() => {
    if (isActive) {
      return startTrap()
    } else {
      stopTrap()
    }
  }, [isActive, startTrap, stopTrap])

  return { containerRef, startTrap, stopTrap }
}

// Helper function to set trapped container and options (used by useFocusTrap)
const setTrappedContainer = (container: HTMLElement | null) => {
  (window as any).__trappedContainer = container
}

const setTrapOptions = (options: FocusTrapOptions | null) => {
  (window as any).__trapOptions = options
}

/**
 * Higher-order component for focus restoration
 */
export function withFocusRestore<P extends object>(
  Component: React.ComponentType<P>
) {
  return function FocusRestoreComponent(props: P) {
    useFocusRestore()
    return <Component {...props} />
  }
}

/**
 * Component that provides visible focus indicators
 */
export function FocusIndicator({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Add CSS for focus indicators if not already present
    const styleId = 'focus-indicator-styles'
    if (!document.getElementById(styleId)) {
      const style = document.createElement('style')
      style.id = styleId
      style.textContent = `
        .focus-visible:focus-visible,
        *:focus-visible {
          outline: 2px solid #007acc;
          outline-offset: 2px;
        }

        /* Ensure focus is visible on interactive elements */
        button:focus-visible,
        a:focus-visible,
        input:focus-visible,
        select:focus-visible,
        textarea:focus-visible,
        [tabindex]:focus-visible {
          outline: 2px solid #007acc;
          outline-offset: 2px;
        }

        /* Skip link for screen readers */
        .skip-link {
          position: absolute;
          top: -40px;
          left: 6px;
          background: #000;
          color: #fff;
          padding: 8px;
          text-decoration: none;
          z-index: 1000;
        }

        .skip-link:focus {
          top: 6px;
        }
      `
      document.head.appendChild(style)
    }
  }, [])

  return <>{children}</>
}

/**
 * Skip link component for keyboard navigation
 */
export function SkipLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="skip-link">
      {children}
    </a>
  )
}
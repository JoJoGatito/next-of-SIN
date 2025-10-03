'use client'

import { useState, useEffect } from 'react'

/**
 * Custom hook to detect user's reduced motion preference
 * @returns {boolean} true if user prefers reduced motion, false otherwise
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState<boolean>(false)

  useEffect(() => {
    // Check if window is available (client-side)
    if (typeof window === 'undefined') return

    // Create media query for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')

    // Set initial value
    setPrefersReducedMotion(mediaQuery.matches)

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    // Add listener for modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange)
      return () => mediaQuery.removeEventListener('change', handleChange)
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange)
      return () => mediaQuery.removeListener(handleChange)
    }
  }, [])

  return prefersReducedMotion
}

/**
 * Hook to get animation classes based on reduced motion preference
 * @param motionClasses - Classes to use when motion is preferred
 * @param reducedMotionClasses - Classes to use when reduced motion is preferred
 * @returns {string} Appropriate classes based on user preference
 */
export function useConditionalAnimation(
  motionClasses: string,
  reducedMotionClasses: string = ''
): string {
  const prefersReducedMotion = useReducedMotion()
  return prefersReducedMotion ? reducedMotionClasses : motionClasses
}

/**
 * Hook to get animation styles based on reduced motion preference
 * @param motionStyles - Styles to use when motion is preferred
 * @param reducedMotionStyles - Styles to use when reduced motion is preferred
 * @returns {React.CSSProperties} Appropriate styles based on user preference
 */
export function useConditionalAnimationStyles(
  motionStyles: React.CSSProperties,
  reducedMotionStyles: React.CSSProperties = {}
): React.CSSProperties {
  const prefersReducedMotion = useReducedMotion()
  return prefersReducedMotion ? reducedMotionStyles : motionStyles
}
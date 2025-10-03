'use client'

import React, { useState, useEffect } from 'react'

interface OptimizedBackdropProps {
  children: React.ReactNode
  className?: string
  blur?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl'
  fallback?: React.ReactNode
  enableHardwareAcceleration?: boolean
  maxSize?: { width?: number; height?: number }
}

/**
 * Optimized backdrop filter component with performance optimizations and fallbacks
 */
export default function OptimizedBackdrop({
  children,
  className = '',
  blur = 'md',
  fallback,
  enableHardwareAcceleration = true,
  maxSize
}: OptimizedBackdropProps) {
  const [supportsBackdropFilter, setSupportsBackdropFilter] = useState<boolean>(true)

  useEffect(() => {
    // Check if browser supports backdrop-filter
    if (typeof window !== 'undefined') {
      const testElement = document.createElement('div')
      testElement.style.backdropFilter = 'blur(10px)'
      setSupportsBackdropFilter(testElement.style.backdropFilter === 'blur(10px)')
    }
  }, [])

  // Blur classes mapping
  const blurClasses = {
    none: '',
    sm: 'backdrop-blur-sm',
    md: 'backdrop-blur-md',
    lg: 'backdrop-blur-lg',
    xl: 'backdrop-blur-xl',
    '2xl': 'backdrop-blur-2xl',
    '3xl': 'backdrop-blur-3xl'
  }

  // Hardware acceleration styles
  const hardwareAccelerationStyles: React.CSSProperties = enableHardwareAcceleration ? {
    willChange: 'backdrop-filter',
    transform: 'translateZ(0)', // Force hardware acceleration
    backfaceVisibility: 'hidden'
  } : {}

  // Size constraints for performance
  const sizeStyles: React.CSSProperties = maxSize ? {
    maxWidth: maxSize.width,
    maxHeight: maxSize.height
  } : {}

  // Combine styles
  const combinedStyles: React.CSSProperties = {
    ...hardwareAccelerationStyles,
    ...sizeStyles
  }

  if (!supportsBackdropFilter && fallback) {
    return <>{fallback}</>
  }

  if (!supportsBackdropFilter) {
    // Fallback to semi-transparent background
    return (
      <div
        className={`bg-black/10 dark:bg-white/10 ${className}`}
        style={combinedStyles}
      >
        {children}
      </div>
    )
  }

  return (
    <div
      className={`backdrop-filter ${blurClasses[blur]} ${className}`}
      style={combinedStyles}
    >
      {children}
    </div>
  )
}

/**
 * Hook to check backdrop filter support
 */
export function useBackdropFilterSupport(): boolean {
  const [supportsBackdropFilter, setSupportsBackdropFilter] = useState<boolean>(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const testElement = document.createElement('div')
      testElement.style.backdropFilter = 'blur(10px)'
      setSupportsBackdropFilter(testElement.style.backdropFilter === 'blur(10px)')
    }
  }, [])

  return supportsBackdropFilter
}
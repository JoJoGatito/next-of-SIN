import React from 'react'

interface AccessibleGradientProps {
  /**
   * The actual text content that should be read by screen readers
   */
  text: string
  /**
   * Additional CSS classes for the gradient element
   */
  className?: string
  /**
   * The HTML tag to render (default: span)
   */
  as?: keyof JSX.IntrinsicElements
  /**
   * Whether this is a decorative gradient that should be hidden from screen readers
   */
  isDecorative?: boolean
}

/**
 * AccessibleGradient component that properly handles gradients for screen readers
 * 
 * For text gradients: Shows the actual text to screen readers while applying gradient visually
 * For decorative gradients: Hides them completely from screen readers
 */
export function AccessibleGradient({ 
  text, 
  className = '', 
  as: Component = 'span',
  isDecorative = false 
}: AccessibleGradientProps) {
  if (isDecorative) {
    // For decorative gradients, hide from screen readers completely
    return (
      <Component 
        className={className}
        aria-hidden="true"
        role="presentation"
      />
    )
  }

  // For text with gradient effect, ensure screen readers only see the text
  return (
    <Component 
      className={`gradient-text ${className}`}
      // Ensure the gradient effect doesn't interfere with screen readers
      role="text"
    >
      {text}
    </Component>
  )
}

/**
 * Decorative gradient bar component that is hidden from screen readers
 */
export function DecorativeGradientBar({ 
  className = '' 
}: { 
  className?: string 
}) {
  return (
    <div 
      className={className}
      aria-hidden="true"
      role="presentation"
    />
  )
}

/**
 * Gradient background component that is hidden from screen readers
 */
export function GradientBackground({ 
  children,
  className = '',
  gradientClassName = ''
}: { 
  children: React.ReactNode
  className?: string
  gradientClassName?: string
}) {
  return (
    <div className={`relative ${className}`}>
      {/* Gradient overlay - hidden from screen readers */}
      <div 
        className={`absolute inset-0 ${gradientClassName}`}
        aria-hidden="true"
        role="presentation"
      />
      {/* Content that screen readers will see */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  )
}
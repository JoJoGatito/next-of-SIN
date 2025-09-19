import { ExternalLink as ExternalLinkIcon } from 'lucide-react'

interface ExternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  showIcon?: boolean
  ariaLabel?: string
}

/**
 * Accessible external link component that:
 * - Opens in a new tab safely with rel="noopener noreferrer"
 * - Indicates to screen readers that it opens in a new tab
 * - Optionally shows a visual indicator
 */
export function ExternalLink({ 
  href, 
  children, 
  className = '',
  showIcon = true,
  ariaLabel
}: ExternalLinkProps) {
  const linkText = typeof children === 'string' ? children : ''
  const finalAriaLabel = ariaLabel || `${linkText} (opens in new tab)`
  
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1 ${className}`}
      aria-label={finalAriaLabel}
    >
      {children}
      {showIcon && (
        <ExternalLinkIcon 
          className="w-3 h-3 opacity-70" 
          aria-hidden="true"
        />
      )}
      <span className="sr-only">(opens in new tab)</span>
    </a>
  )
}
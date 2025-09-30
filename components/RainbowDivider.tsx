'use client'

import React from 'react'

export interface RainbowDividerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Tailwind height class. Example: "h-1", "h-[3px]". Defaults to "h-1".
   */
  heightClassName?: string
  /**
   * Adds vertical margin classes around the divider. Example: "my-8".
   */
  marginClassName?: string
}

/**
 * Decorative, accessible rainbow divider bar used to separate sections.
 * Hidden from screen readers and marked as purely presentational.
 */
export default function RainbowDivider({
  heightClassName = 'h-1',
  marginClassName = '',
  className = '',
  ...rest
}: RainbowDividerProps) {
  return (
    <div
      className={`${heightClassName} rainbow-bar ${marginClassName} ${className}`.trim()}
      style={{
        // Keep the same gradient used on the home page for visual consistency
        background:
          'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
      }}
      aria-hidden="true"
      role="presentation"
      {...rest}
    />
  )
}
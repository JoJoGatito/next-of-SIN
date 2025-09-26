'use client'

import { createContext, useContext, useEffect, useState, useRef } from 'react'

type Theme = 'dark' | 'light' | 'system'

type ThemeProviderProps = {
  children: React.ReactNode
  attribute: string
  defaultTheme?: Theme
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

const ThemeContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
  isReady: boolean
}>({
  theme: 'system',
  setTheme: () => null,
  isReady: false,
})

// Get initial theme from localStorage on the client side
const getInitialTheme = (defaultTheme: Theme): Theme => {
  if (typeof window === 'undefined') return defaultTheme
  
  try {
    const savedTheme = localStorage.getItem('theme') as Theme
    return savedTheme || defaultTheme
  } catch {
    return defaultTheme
  }
}

export function ThemeProvider({
  children,
  attribute = 'class',
  defaultTheme = 'system',
  enableSystem = true,
  disableTransitionOnChange = false,
  ...props
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(() => getInitialTheme(defaultTheme))
  const [mounted, setMounted] = useState(false)
  const [isReady, setIsReady] = useState(false)
  const isApplyingTheme = useRef(false)

  // Custom setTheme function that ensures immediate application
  const setTheme = (newTheme: Theme) => {
    if (isApplyingTheme.current) return // Prevent race conditions
    
    isApplyingTheme.current = true
    setThemeState(newTheme)
    
    // Apply theme immediately to DOM for faster feedback
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement
      
      if (disableTransitionOnChange) {
        root.style.transition = 'none'
      }
      
      root.classList.remove('light', 'dark')
      
      if (newTheme === 'system' && enableSystem) {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
        root.classList.add(systemTheme)
      } else {
        root.classList.add(newTheme)
      }
      
      if (disableTransitionOnChange) {
        // Use requestAnimationFrame for better timing
        requestAnimationFrame(() => {
          root.style.transition = ''
        })
      }
      
      try {
        localStorage.setItem('theme', newTheme)
      } catch {
        // Handle localStorage errors silently
      }
    }
    
    // Reset the flag after a short delay
    setTimeout(() => {
      isApplyingTheme.current = false
    }, 50)
  }

  useEffect(() => {
    setMounted(true)
    
    // Load theme from localStorage if not already loaded
    if (typeof window !== 'undefined') {
      try {
        const localTheme = localStorage.getItem('theme') as Theme | null
        if (localTheme) {
          setThemeState((prev) => (prev !== localTheme ? (localTheme as Theme) : prev))
        }
      } catch {
        // Handle localStorage errors silently
      }
    }
    
    // Set ready state after a brief delay to ensure everything is initialized
    const readyTimer = setTimeout(() => {
      setIsReady(true)
    }, 100)
    
    return () => clearTimeout(readyTimer)
  }, [])

  useEffect(() => {
    if (!mounted) return

    const root = window.document.documentElement

    if (disableTransitionOnChange) {
      root.style.transition = 'none'
    }

    root.classList.remove('light', 'dark')

    if (theme === 'system' && enableSystem) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light'
      root.classList.add(systemTheme)
    } else {
      root.classList.add(theme)
    }

    if (disableTransitionOnChange) {
      requestAnimationFrame(() => {
        root.style.transition = ''
      })
    }

    try {
      localStorage.setItem('theme', theme)
    } catch {
      // Handle localStorage errors silently
    }
  }, [theme, mounted, enableSystem, disableTransitionOnChange])

  // Always render children to avoid hydration issues
  // The theme will be applied correctly once mounted
  return (
    <ThemeContext.Provider value={{ theme, setTheme, isReady }} {...props}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

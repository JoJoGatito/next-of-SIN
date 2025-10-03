'use client'

import { useAriaAnnounce } from './AriaLiveRegion'
import { useFocusRestore } from './FocusManager'
import { AriaLiveRegion } from './AriaLiveRegion'

/**
 * Examples of how to use accessibility features throughout the application
 */
export function AccessibilityExamples() {
  const { announce } = useAriaAnnounce()
  const { saveFocus, restoreFocus } = useFocusRestore()

  const handleButtonClick = () => {
    // Announce the action to screen readers
    announce('Button clicked! Action completed successfully.', {
      politeness: 'assertive',
      clearAfter: 2000
    })

    // Example of focus management for complex interactions
    saveFocus()
    // ... do some work ...
    setTimeout(() => {
      restoreFocus()
    }, 1000)
  }

  const handleStatusUpdate = (message: string) => {
    announce(message, {
      politeness: 'polite',
      role: 'status',
      clearAfter: 5000
    })
  }

  return (
    <div className="space-y-4">
      {/* Example of local ARIA announcements */}
      <AriaLiveRegion
        message="This is a polite status update"
        politeness="polite"
        role="status"
        clearAfter={3000}
      />

      {/* Example button with announcements */}
      <button
        onClick={handleButtonClick}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Click me with announcement
      </button>

      {/* Example of manual status updates */}
      <button
        onClick={() => handleStatusUpdate('Data loaded successfully')}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
      >
        Update status
      </button>
    </div>
  )
}

/**
 * Higher-order component example for adding announcements to existing components
 */
export function withAnnouncements<P extends object>(
  Component: React.ComponentType<P>,
  announcementConfig?: {
    onMount?: string
    onUnmount?: string
    onUpdate?: string
  }
) {
  return function AnnouncedComponent(props: P) {
    const { announce } = useAriaAnnounce()

    React.useEffect(() => {
      if (announcementConfig?.onMount) {
        announce(announcementConfig.onMount, {
          politeness: 'polite',
          clearAfter: 2000
        })
      }

      return () => {
        if (announcementConfig?.onUnmount) {
          announce(announcementConfig.onUnmount, {
            politeness: 'polite',
            clearAfter: 1000
          })
        }
      }
    }, [announce])

    return <Component {...props} />
  }
}

/**
 * Example of using focus restoration in a form component
 */
export function AccessibleForm() {
  const { saveFocus, restoreFocus } = useFocusRestore()
  const { announce } = useAriaAnnounce()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    saveFocus()

    announce('Form submitted successfully! Processing...', {
      politeness: 'assertive',
      clearAfter: 3000
    })

    // Simulate form processing
    setTimeout(() => {
      announce('Form processed. Redirecting to confirmation page.', {
        politeness: 'assertive',
        clearAfter: 2000
      })
      restoreFocus()
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-2">
          Name
        </label>
        <input
          id="name"
          type="text"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
      </div>

      <button
        type="submit"
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Submit Form
      </button>
    </form>
  )
}

/**
 * Example of using ARIA live regions for dynamic content updates
 */
export function DynamicContentExample() {
  const [status, setStatus] = React.useState('idle')
  const { announce } = useAriaAnnounce()

  const handleAction = async () => {
    setStatus('loading')
    announce('Loading content...', { politeness: 'polite' })

    // Simulate async operation
    await new Promise(resolve => setTimeout(resolve, 2000))

    setStatus('success')
    announce('Content loaded successfully!', {
      politeness: 'assertive',
      clearAfter: 3000
    })
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleAction}
        disabled={status === 'loading'}
        className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50"
      >
        {status === 'loading' ? 'Loading...' : 'Load Content'}
      </button>

      {/* Local live region for this component's status */}
      <AriaLiveRegion
        message={
          status === 'loading' ? 'Loading content, please wait...' :
          status === 'success' ? 'Content loaded successfully!' :
          ''
        }
        politeness={status === 'loading' ? 'assertive' : 'polite'}
        clearAfter={status === 'success' ? 3000 : 0}
      />
    </div>
  )
}

// Add React import for JSX
import React, { useState } from 'react'
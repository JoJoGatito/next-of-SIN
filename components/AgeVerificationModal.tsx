'use client'

import { useState } from 'react'
import { X } from 'lucide-react'

interface AgeVerificationModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AgeVerificationModal({ isOpen, onClose }: AgeVerificationModalProps) {
  const [showMessage, setShowMessage] = useState(false)

  if (!isOpen) return null

  const handleYes = () => {
    window.open('https://discord.com/invite/h9XxqjxSDS', '_blank')
    onClose()
  }

  const handleNo = () => {
    setShowMessage(true)
  }

  const handleCloseMessage = () => {
    setShowMessage(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50" onClick={onClose}>
      <div
        className="relative bg-white dark:bg-gray-900 rounded-lg shadow-xl max-w-md w-full p-6"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!showMessage ? (
          <>
            <h2 id="modal-title" className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Age Verification
            </h2>

            <p className="text-gray-700 dark:text-gray-300 mb-6">
              Are you between 14-20 years old?
            </p>

            <div className="flex gap-3">
              <button
                onClick={handleYes}
                className="flex-1 px-4 py-2 bg-gradient-to-r from-sin-orange to-sin-yellow text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105"
                aria-label="Yes, I am between 14-20 years old"
              >
                Yes
              </button>
              <button
                onClick={handleNo}
                className="flex-1 px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-300"
                aria-label="No, I am not between 14-20 years old"
              >
                No
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">
              Age Verification Result
            </h2>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
              <p className="text-blue-800 dark:text-blue-200">
                This is a vetted space designed specifically for youth aged 14-20. We appreciate your understanding and encourage you to explore other resources that may be more suitable for your age group.
              </p>
            </div>

            <button
              onClick={handleCloseMessage}
              className="w-full px-4 py-2 bg-gradient-to-r from-sin-orange to-sin-yellow text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105"
              aria-label="Close and return to main page"
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  )
}
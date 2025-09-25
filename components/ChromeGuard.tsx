'use client'

import { usePathname } from 'next/navigation'
import React from 'react'

export default function ChromeGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (pathname && pathname.startsWith('/studio')) {
    return null
  }
  return <>{children}</>
}
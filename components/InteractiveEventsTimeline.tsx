'use client'

import { useState, useEffect } from 'react'
import { Calendar, Clock, MapPin } from 'lucide-react'
import OrbField from '@/components/OrbField'
interface TimelineEvent {
  id: string
  title?: string
  start?: string
  end?: string
  location?: string
  program?: string
  description?: string
  capacity?: number
}

interface InteractiveEventsTimelineProps {
  events: TimelineEvent[]
}

function getProgramColor(program?: string) {
  switch (program) {
    case 'Hue House':
      return 'from-purple-100 to-purple-200 dark:from-purple-800 dark:to-purple-900'
    case 'Rock & Stone':
      return 'from-yellow-100 to-amber-200 dark:from-yellow-900 dark:to-amber-900'
    case 'Sunstone Youth Group':
      return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
    default:
      return 'from-orange-100 to-yellow-200 dark:from-orange-900 dark:to-yellow-900'
  }
}

export default function InteractiveEventsTimeline({ events }: InteractiveEventsTimelineProps) {
  return <div data-test="timeline-smoke" />
}

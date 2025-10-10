import { Suspense } from 'react'
import EventsClient from '../../components/events/EventsClient'
import { client } from '../../lib/sanity.client'
import { eventsQuery } from '../../lib/queries'

// Revalidate the events page every 60s so new publishes appear quickly
export const revalidate = 60

type SanityEvent = {
  _id: string
  title?: string
  start?: string
  end?: string
  location?: string
  description?: string
  capacity?: number
}

export default async function EventsPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  console.log('[EventsPage] Sanity config', { projectId, dataset })

  let events: SanityEvent[] = []
  try {
    events = await client.fetch<SanityEvent[]>(eventsQuery)
  } catch (err) {
    console.error('[EventsPage] Sanity fetch failed', err)
  }
  console.log('[EventsPage] fetched events count', events?.length ?? 0)

  const validEvents = (events || []).filter((e): e is SanityEvent & { start: string } => {
    return typeof e.start === 'string' && e.start.length > 0
  })

  // America/Denver day-based filter:
  // Keep events whose end date (if present) or start date is today or later in America/Denver.
  const fmt = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Denver',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  })
  const todayYMD = fmt.format(new Date())

  const toYMDInTZ = (iso?: string) => {
    if (!iso) return null
    const d = new Date(iso)
    return fmt.format(d)
  }

  const upcomingEvents = validEvents.filter((e) => {
    const lastYMD = toYMDInTZ(e.end ?? e.start)
    return !!lastYMD && lastYMD >= todayYMD
  })

  console.log('[EventsPage] upcoming (America/Denver day-based)', {
    total: events?.length ?? 0,
    valid: validEvents.length,
    upcoming: upcomingEvents.length,
    todayYMD,
  })

  const transformedEvents = upcomingEvents.map((e) => ({
    id: e._id,
    title: e.title ?? 'Untitled Event',
    start: e.start,
    end: e.end,
    location: e.location,
    description: e.description ?? '',
    capacity: e.capacity,
  }))

  return (
    <Suspense fallback={null}>
      <EventsClient events={transformedEvents} />
    </Suspense>
  )
}
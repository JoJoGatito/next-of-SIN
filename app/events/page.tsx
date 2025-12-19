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
  console.log('[EventsPage] fetched events', {
    count: events?.length ?? 0,
    sample: events.slice(0, 3).map((e) => ({
      id: e._id,
      title: e.title,
      start: e.start,
      end: e.end,
    })),
  })

  const validEvents = (events || []).filter((e): e is SanityEvent & { start: string } => {
    return typeof e.start === 'string' && e.start.length > 0
  })

  // Filter to only upcoming events (based on start/end Date, not just day)
  // If an event has an end, we use that as the last relevant moment; otherwise its start.
  const now = new Date()
  const upcomingEvents = validEvents.filter((e) => {
    const end = e.end ? new Date(e.end) : null
    const last = end ?? new Date(e.start)
    return last >= now
  })

  // Sort upcoming events chronologically by start time
  const sortedEvents = [...upcomingEvents].sort((a, b) => {
    const aTime = new Date(a.start).getTime()
    const bTime = new Date(b.start).getTime()
    return aTime - bTime
  })

  console.log('[EventsPage] transformed events for /events', {
    total: events?.length ?? 0,
    valid: validEvents.length,
    upcoming: upcomingEvents.length,
    sorted: sortedEvents.length,
  })

  const transformedEvents = sortedEvents.map((e) => ({
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

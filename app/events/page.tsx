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
  console.log('[EventsPage] valid events with start', { total: events?.length ?? 0, valid: validEvents.length })

  const transformedEvents = validEvents.map((e) => ({
    id: e._id,
    title: e.title ?? 'Untitled Event',
    start: e.start,
    end: e.end,
    location: e.location,
    description: e.description ?? '',
    capacity: e.capacity,
  }))

  return <EventsClient events={transformedEvents} />
}
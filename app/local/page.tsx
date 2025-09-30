import LocalPageClient from './LocalPageClient'
import { client } from '@/lib/sanity.client'
import { localEventsQuery, resourcesQuery } from '@/lib/queries'

// Revalidate the local page every 60s so new publishes appear quickly
export const revalidate = 60

type SanityLocalEvent = {
  _id: string
  title?: string
  start?: string
  end?: string
  location?: string
  address?: string
  description?: string
  image?: any
  website?: string
  capacity?: number
}

type SanityResource = {
  _id: string
  name?: string
  slug?: any
  category?: string
  description?: string
  link?: string
  contact?: {
    phone?: string
    email?: string
    address?: string
  }
  hours?: {
    monday?: string
    tuesday?: string
    wednesday?: string
    thursday?: string
    friday?: string
    saturday?: string
    sunday?: string
  }
}

export default async function LocalPage() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
  console.log('[LocalPage] Sanity config', { projectId, dataset })

  let localEvents: SanityLocalEvent[] = []
  let resources: SanityResource[] = []

  try {
    localEvents = await client.fetch<SanityLocalEvent[]>(localEventsQuery)
    resources = await client.fetch<SanityResource[]>(resourcesQuery)
  } catch (err) {
    console.error('[LocalPage] Sanity fetch failed', err)
  }

  console.log('[LocalPage] fetched data', {
    localEvents: localEvents?.length ?? 0,
    resources: resources?.length ?? 0
  })

  const validLocalEvents = (localEvents || []).filter((e): e is SanityLocalEvent & { start: string } => {
    return typeof e.start === 'string' && e.start.length > 0
  })

  const transformedLocalEvents = validLocalEvents.map((e) => ({
    id: e._id,
    title: e.title ?? 'Untitled Event',
    start: e.start,
    end: e.end,
    location: e.location,
    address: e.address,
    description: e.description ?? '',
    image: e.image,
    website: e.website,
    capacity: e.capacity,
  }))

  const transformedResources = (resources || []).map((r) => ({
    id: r._id,
    name: r.name ?? 'Untitled Resource',
    slug: r.slug,
    category: r.category,
    description: r.description ?? '',
    link: r.link,
    contact: r.contact,
    hours: r.hours,
  }))

  return <LocalPageClient localEvents={transformedLocalEvents} resources={transformedResources} />
}
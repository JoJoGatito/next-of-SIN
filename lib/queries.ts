import { groq } from 'next-sanity'

export const eventsQuery = groq`
  *[_type == "event"] | order(start asc) {
    _id,
    title,
    slug,
    start,
    end,
    location,
    program,
    description,
    capacity,
    registrationUrl,
    image
  }
`

export const recentEventsQuery = groq`
  *[_type == "event"] | order(start desc)[0...3] {
    _id,
    title,
    slug,
    start,
    end,
    location,
    program,
    description,
    capacity,
    registrationUrl,
    image
  }
`

export const upcomingEventsQuery = groq`
  *[_type == "event" && defined(start) && (start >= now() || (defined(end) && end >= now()))] | order(start asc)[0...3] {
    _id,
    title,
    slug,
    start,
    end,
    location,
    program,
    description,
    capacity,
    registrationUrl,
    image
  }
`
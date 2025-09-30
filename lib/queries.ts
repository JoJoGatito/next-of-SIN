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

export const resourcesQuery = groq`
   *[_type == "resource"] | order(name asc) {
     _id,
     name,
     slug,
     category,
     description,
     link,
     contact,
     hours
   }
 `

export const resourcesByCategoryQuery = groq`
   *[_type == "resource" && category == $category] | order(name asc) {
     _id,
     name,
     slug,
     category,
     description,
     link,
     contact,
     hours,
     services
   }
 `

export const localEventsQuery = groq`
   *[_type == "localEvent"] | order(start asc) {
     _id,
     title,
     slug,
     start,
     end,
     location,
     address,
     description,
     image,
     website,
     capacity
   }
 `

export const upcomingLocalEventsQuery = groq`
   *[_type == "localEvent" && defined(start) && (start >= now() || (defined(end) && end >= now()))] | order(start asc) {
     _id,
     title,
     slug,
     start,
     end,
     location,
     address,
     description,
     image,
     website,
     capacity
   }
 `
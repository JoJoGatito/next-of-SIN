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

export const programGalleryBySlugQuery = groq`
  *[_type == "programGallery" && programSlug == $slug][0] {
    _id,
    images[] {
      image {
        asset->{
          _id,
          url,
          metadata {
            dimensions {
              width,
              height
            }
          }
        }
      },
      alt,
      caption,
      aspectRatio
    }
  }
`

// TypeScript types for program gallery
export interface SanityGalleryImage {
  image: {
    asset: {
      _id: string
      url: string
      metadata: {
        dimensions: {
          width: number
          height: number
        }
      }
    }
  }
  alt: string
  caption?: string
  aspectRatio: 'square' | 'wide' | 'tall'
}

export interface SanityProgramGallery {
  _id: string
  images: SanityGalleryImage[]
}

// Helper function to fetch program gallery by slug
export async function getProgramGalleryBySlug(slug: string): Promise<SanityProgramGallery | null> {
  try {
    const { client } = await import('./sanity.client')
    const gallery = await client.fetch<SanityProgramGallery | null>(programGalleryBySlugQuery, { slug })
    return gallery
  } catch (error) {
    console.error('Error fetching program gallery by slug:', error)
    return null
  }
}
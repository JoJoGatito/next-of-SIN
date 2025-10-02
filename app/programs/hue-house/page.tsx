import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Palette, Calendar, Users, Globe } from 'lucide-react'
import RainbowDivider from '@/components/RainbowDivider'
import GalleryBento from '@/components/GalleryBento'
import { getProgramGalleryBySlug } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Hue House | BIPOC Community Program | SIN',
  description: 'A vibrant community focused on BIPOC discussions, meet-ups, and local events that celebrate the diversity of the queer community and allies in Southern Colorado.',
  keywords: 'BIPOC community events, BIPOC queer space, BIPOC discussion group, people of color community, QTBIPOC programs, BIPOC allies, Southern Colorado BIPOC events, inclusive BIPOC gatherings',
  openGraph: {
    title: 'Hue House | BIPOC Community Program',
    description: 'A community of BIPOC-focused discussions, meet & greets, and local events celebrating diversity in Southern Colorado.',
    url: 'https://sunstoneinclusivity.network/programs/hue-house',
    siteName: 'Sunstone Inclusivity Network',
    locale: 'en_US',
    type: 'website',
  },
}

export default async function HueHousePage() {
  // Fetch gallery data from Sanity with caching
  const gallery = await getProgramGalleryBySlug('hue-house')
  return (
    <div className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <div className="p-3 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 bg-opacity-10 mr-4">
            <Palette className="w-8 h-8 text-purple-500" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Hue House
          </h1>
        </div>

        <div className="relative w-full h-60 md:h-80 mb-8 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            Hue House Community Image Placeholder
          </div>
        </div>

        <RainbowDivider marginClassName="my-8" />

        <div className="prose dark:prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-bold mb-4">About Hue House</h2>
          <p>
            Hue House is a vibrant community dedicated to BIPOC (Black, Indigenous, and People of Color) 
            focused discussions, meet & greets, and local events that celebrate the diversity of the queer 
            community and its allies. We create intentional spaces that center the experiences, voices, 
            and leadership of BIPOC individuals in Southern Colorado.
          </p>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-400/10 to-purple-600/10 rounded-full inline-flex my-6">
            <Calendar className="w-5 h-5 text-purple-500" aria-hidden="true" />
            <span className="text-base font-medium">Monthly meetings</span>
          </div>
          
          <h2 className="text-2xl font-bold my-4">Our Community Focus</h2>
          <p>
            At Hue House, we recognize that BIPOC individuals within the queer community face unique challenges 
            and have distinct experiences. Our program provides a dedicated space where these experiences are 
            centered, honored, and celebrated. We foster connection, build solidarity, and create opportunities 
            for authentic expression.
          </p>
          
          <h2 className="text-2xl font-bold my-4">What We Offer</h2>
          <ul>
            <li>Monthly community gatherings and social events</li>
            <li>Discussion groups on topics relevant to QTBIPOC experiences</li>
            <li>Cultural celebrations highlighting BIPOC heritage and contributions</li>
            <li>Educational workshops on anti-racism, intersectionality, and allyship</li>
            <li>Networking opportunities for BIPOC community members</li>
            <li>Collaborative art and storytelling projects</li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-purple-500 mb-2" aria-hidden="true" />
              <h3 className="font-bold">Community-Centered</h3>
              <p className="text-sm">Created by and for the BIPOC community</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center text-center">
              <Globe className="w-8 h-8 text-purple-500 mb-2" aria-hidden="true" />
              <h3 className="font-bold">Cultural Celebration</h3>
              <p className="text-sm">Honoring diverse cultural backgrounds and experiences</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center text-center">
              <Calendar className="w-8 h-8 text-purple-500 mb-2" aria-hidden="true" />
              <h3 className="font-bold">Regular Events</h3>
              <p className="text-sm">Consistent opportunities for connection and community</p>
            </div>
          </div>

          <RainbowDivider marginClassName="my-8" />
        </div>

        <section aria-labelledby="gallery" className="mt-12">
          <h2 id="gallery" className="text-2xl font-bold mb-4">Photo Gallery</h2>
          <GalleryBento gallery={gallery} />
          <p className="text-sm text-foreground/70 mt-3">
            More photos coming soon. See upcoming gatherings and events on our{' '}
            <Link href="/events" className="text-purple-500 underline-offset-2 hover:underline">Events</Link> page.
          </p>
        </section>
        <RainbowDivider marginClassName="my-12" />

        <div className="prose dark:prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-bold my-4">Join Hue House</h2>
          <p>
            Hue House welcomes BIPOC individuals and respectful allies who are committed to creating 
            spaces that center BIPOC voices and experiences. Join us in building a community where 
            everyone&apos;s whole self is respected, celebrated, and empowered.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 mt-4">
            <button 
              className="px-6 py-3 bg-gradient-to-r from-purple-400 to-purple-600 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105"
              aria-label="Join Hue House community program"
            >
              Join Our Community
            </button>
            <Link 
              href="/events"
              className="px-6 py-3 border-2 border-purple-500 text-purple-500 font-medium rounded-lg hover:bg-purple-500/10 transition-all duration-300 hover:scale-105"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
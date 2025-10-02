import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, MapPin, Users, Shield } from 'lucide-react'
import RainbowDivider from '@/components/RainbowDivider'
import GalleryBento from '@/components/GalleryBento'
import { getProgramGalleryBySlug } from '@/lib/queries'

export const metadata: Metadata = {
  title: 'Sunstone Youth Group | LGBTQ+ Youth Support | SIN',
  description: 'A safe and supportive space for LGBTQ+ youth to connect, learn, and grow together through weekly meetings, mentorship, and community activities.',
  keywords: 'LGBTQ+ youth group, queer youth support, LGBTQ+ teen community, Southern Colorado youth program, safe space for LGBTQ+ teens, queer youth activities, LGBTQ+ youth resources',
  openGraph: {
    title: 'Sunstone Youth Group | LGBTQ+ Youth Support',
    description: 'A safe and supportive space for LGBTQ+ youth to connect, learn, and grow together through weekly meetings and activities.',
    url: 'https://sunstoneinclusivity.network/programs/sunstone-youth-group',
    siteName: 'Sunstone Inclusivity Network',
    locale: 'en_US',
    type: 'website',
  },
}

export default async function SunstoneYouthGroupPage() {
  // Fetch gallery data from Sanity with caching
  const gallery = await getProgramGalleryBySlug('sunstone-youth-group')
  return (
    <div className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="sr-only">Sunstone Youth Group</h1>
        <div className="mb-8 flex items-center justify-center">
          <Image
            src="/assets/images/logo/SYG%20LOGO-2.webp"
            alt="Sunstone Youth Group"
            width={800}
            height={800}
            className="h-28 sm:h-32 md:h-40 lg:h-48 w-auto"
            priority
          />
        </div>
        <RainbowDivider marginClassName="my-8" />

        <div className="prose dark:prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-bold mb-4">About Sunstone Youth Group</h2>
          <p>
            Sunstone Youth Group provides a safe and supportive space for LGBTQ+ youth to connect, learn, and grow together. 
            Our program focuses on creating a community where young people can express themselves authentically, 
            build friendships, and access resources specifically designed for their needs.
          </p>
          
          <h2 className="text-2xl font-bold my-4">What We Offer</h2>
          <ul>
            <li>Weekly meetings in a safe, affirming environment</li>
            <li>Peer support and mentorship opportunities</li>
            <li>Educational workshops on LGBTQ+ history and issues</li>
            <li>Creative expression through art, writing, and performance</li>
            <li>Social activities and community building events</li>
            <li>Resources for families and allies</li>
          </ul>

          <div className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-sin-orange/10 to-sin-yellow/10 rounded-full inline-flex my-6">
            <Calendar className="w-5 h-5 text-sin-orange" aria-hidden="true" />
            <span className="text-base font-medium">Weekly meetings</span>
          </div>

          <h2 className="text-2xl font-bold my-4">Join Sunstone Youth Group</h2>
          <p>
            We welcome LGBTQ+ youth and allies in Southern Colorado. Our program creates a space where 
            everyone can be their authentic self while building community connections and developing leadership skills.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 mt-4">
            <button
              className="px-6 py-3 bg-gradient-to-r from-sin-orange to-sin-yellow text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105"
              aria-label="Join Sunstone Youth Group program"
            >
              Join Our Program
            </button>
            <Link
              href="/events"
              className="px-6 py-3 border-2 border-sin-orange text-sin-orange font-medium rounded-lg hover:bg-sin-orange/10 transition-all duration-300 hover:scale-105"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
        <RainbowDivider marginClassName="my-12" />

        <section aria-labelledby="program-info" className="mt-12">
          <h2 id="program-info" className="text-2xl font-bold mb-4">Program Info</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-start gap-3 p-4 rounded-lg border border-orange-200/60 dark:border-orange-900/40 bg-orange-50/50 dark:bg-orange-950/20">
              <Users className="w-5 h-5 text-sin-orange mt-1" aria-hidden="true" />
              <div>
                <p className="font-medium">{"Who it's for"}</p>
                <p className="text-foreground/80">LGBTQ+ youth and allies in Southern Colorado.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border border-orange-200/60 dark:border-orange-900/40 bg-orange-50/50 dark:bg-orange-950/20">
              <Calendar className="w-5 h-5 text-sin-orange mt-1" aria-hidden="true" />
              <div>
                <p className="font-medium">When we meet</p>
                <p className="text-foreground/80">Weekly — see the Events page for dates and times.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border border-orange-200/60 dark:border-orange-900/40 bg-orange-50/50 dark:bg-orange-950/20">
              <MapPin className="w-5 h-5 text-sin-orange mt-1" aria-hidden="true" />
              <div>
                <p className="font-medium">Where</p>
                <p className="text-foreground/80">Locations in Pueblo and surrounding areas — details in each event.</p>
              </div>
            </div>
            <div className="flex items-start gap-3 p-4 rounded-lg border border-orange-200/60 dark:border-orange-900/40 bg-orange-50/50 dark:bg-orange-950/20">
              <Shield className="w-5 h-5 text-sin-orange mt-1" aria-hidden="true" />
              <div>
                <p className="font-medium">Safety & support</p>
                <p className="text-foreground/80">Respectful, confidential, and affirming space facilitated by trained volunteers.</p>
              </div>
            </div>
          </div>
        </section>
        <RainbowDivider marginClassName="my-12" />

        <section aria-labelledby="gallery" className="mt-12">
          <h2 id="gallery" className="text-2xl font-bold mb-4">Photo Gallery</h2>
          <GalleryBento gallery={gallery} />
          <p className="text-sm text-foreground/70 mt-3">
            More photos coming soon. See upcoming outings and events on our{' '}
            <Link href="/events" className="text-sin-orange underline-offset-2 hover:underline">Events</Link> page.
          </p>
        </section>
      </div>
    </div>
  )
}
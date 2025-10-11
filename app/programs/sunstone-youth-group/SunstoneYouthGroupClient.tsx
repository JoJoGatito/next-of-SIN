'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Calendar } from 'lucide-react'
import RainbowDivider from '@/components/RainbowDivider'
import GalleryBento from '@/components/GalleryBento'
import AgeVerificationModal from '@/components/AgeVerificationModal'

interface SunstoneYouthGroupClientProps {
  gallery: any
}

export default function SunstoneYouthGroupClient({ gallery }: SunstoneYouthGroupClientProps) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <div className="sunstone-theme bg-sy-background text-sy-text min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto sy-panel-subtle p-6 md:p-8">
        <h1 className="sr-only">Sunstone Youth Group</h1>
        <div className="mb-8 flex items-center justify-center">
          <Image
            src="/assets/images/logo/syg_logo.webp"
            alt="Sunstone Youth Group"
            width={800}
            height={800}
            className="h-28 sm:h-32 md:h-40 lg:h-48 w-auto"
            priority
          />
        </div>
        <RainbowDivider marginClassName="my-8" />

        <div className="prose dark:prose-invert max-w-none mb-12 prose-headings:text-sy-text prose-p:text-sy-text prose-strong:text-sy-text prose-a:text-sy-primary">
          <h2 className="text-2xl font-bold mb-4">About Sunstone Youth Group</h2>
          <p>
            Sunstone Youth Group provides a safe and supportive space for LGBTQIA+ youth to connect, learn, and grow together.
            Our program focuses on creating a community where young people can express themselves authentically,
            build friendships, and access resources specifically designed for their needs.
          </p>

          <h2 className="text-2xl font-bold my-4">What We Offer</h2>
          <ul>
            <li>Weekly meetings in a safe, affirming environment</li>
            <li>Peer support and mentorship opportunities</li>
            <li>Educational workshops on LGBTQIA+ history and issues</li>
            <li>Creative expression through art, writing, and performance</li>
            <li>Social activities and community building events</li>
          </ul>

          <div className="sy-badge my-6 gap-2">
            <Calendar className="w-5 h-5 text-sy-primary" aria-hidden="true" />
            <span className="text-base font-medium">Weekly meetings</span>
          </div>

          <h2 className="text-2xl font-bold my-4">Join Sunstone Youth Group</h2>
          <p>
            We welcome LGBTQ+ youth and allies in Southern Colorado. Our program creates a space where
            everyone can be their authentic self while building community connections and developing leadership skills.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 mt-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-6 py-3 bg-sy-primary-bg text-sy-primary-contrast font-semibold rounded-lg hover:bg-sy-primary-hover transition-all duration-200 sy-focusable"
              aria-label="Join Sunstone Youth Group program"
            >
              Join Our Program
            </button>
            <Link
              href="/events"
              className="px-6 py-3 border-2 border-sy-primary text-sy-primary font-semibold rounded-lg hover:bg-sy-primary-soft transition-all duration-200 sy-focusable"
            >
              Upcoming Events
            </Link>
          </div>
        </div>
        <RainbowDivider marginClassName="my-12" />

        <section aria-labelledby="gallery" className="mt-12">
          <h2 id="gallery" className="text-2xl font-bold mb-4">Photo Gallery</h2>
          <GalleryBento gallery={gallery} />
          <p className="text-sm text-foreground/70 mt-3">
            More photos coming soon. See upcoming outings and events on our{' '}
            <Link href="/events" className="text-sy-primary underline-offset-2 hover:underline">Events</Link> page.
          </p>
        </section>

        <AgeVerificationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  )
}
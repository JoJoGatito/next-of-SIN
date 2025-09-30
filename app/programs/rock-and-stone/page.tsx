import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Calendar, Mountain, Users } from 'lucide-react'
import RainbowDivider from '@/components/RainbowDivider'

export const metadata: Metadata = {
  title: 'Rock & Stone | Inclusive Outdoor Group | SIN',
  description: 'An inclusive outdoor and nature group that welcomes everyone to explore the natural world through accessible activities for all skill levels and abilities in Southern Colorado.',
  keywords: 'inclusive outdoor activities, accessible nature group, disability-friendly hiking, LGBTQ+ outdoor community, adaptive outdoor recreation, inclusive hiking, Southern Colorado nature group',
  openGraph: {
    title: 'Rock & Stone | Inclusive Outdoor Group',
    description: 'Inclusive outdoor and nature group welcoming everyone who wants to explore and connect with the natural world in Southern Colorado.',
    url: 'https://sunstoneinclusivity.network/programs/rock-and-stone',
    siteName: 'Sunstone Inclusivity Network',
    locale: 'en_US',
    type: 'website',
  },
}

export default function RockAndStonePage() {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <div className="p-3 rounded-lg bg-gradient-to-br from-yellow-400 to-amber-600 bg-opacity-10 mr-4">
            <Heart className="w-8 h-8 text-sin-yellow" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Rock & Stone
          </h1>
        </div>

        <div className="relative w-full h-60 md:h-80 mb-8 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-600 opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            Outdoor Group Image Placeholder
          </div>
        </div>

        <RainbowDivider marginClassName="my-8" />

        <div className="prose dark:prose-invert max-w-none mb-12">
          <h2 className="text-2xl font-bold mb-4">About Rock & Stone</h2>
          <p>
            Rock & Stone is an inclusive outdoor and nature group that welcomes everyone who wants to 
            explore and connect with the natural world. We&apos;re committed to making outdoor experiences 
            accessible to people of all abilities, backgrounds, and experience levels.
          </p>
          
          <h2 className="text-2xl font-bold my-4">Our Inclusive Approach</h2>
          <p>
            We believe that nature should be accessible to everyone. Our activities are designed with 
            accessibility in mind, accommodating various physical abilities, neurodivergent needs, and 
            different comfort levels. We work to remove barriers that traditionally limit who can 
            participate in outdoor recreation.
          </p>
          
          <h2 className="text-2xl font-bold my-4">Activities We Offer</h2>
          <ul>
            <li>Accessible nature hikes for all mobility levels</li>
            <li>Adaptive outdoor recreation activities</li>
            <li>Sensory-friendly nature exploration</li>
            <li>Community gardening projects</li>
            <li>Environmental education workshops</li>
            <li>Group camping experiences</li>
          </ul>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-8">
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center text-center">
              <Mountain className="w-8 h-8 text-sin-yellow mb-2" aria-hidden="true" />
              <h3 className="font-bold">All Skill Levels</h3>
              <p className="text-sm">From beginners to experienced outdoor enthusiasts</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center text-center">
              <Users className="w-8 h-8 text-sin-yellow mb-2" aria-hidden="true" />
              <h3 className="font-bold">Welcoming Community</h3>
              <p className="text-sm">LGBTQ+, disability, and BIPOC inclusive spaces</p>
            </div>
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg flex flex-col items-center text-center">
              <Calendar className="w-8 h-8 text-sin-yellow mb-2" aria-hidden="true" />
              <h3 className="font-bold">Regular Events</h3>
              <p className="text-sm">Consistent opportunities to connect with nature</p>
            </div>
          </div>

          <RainbowDivider marginClassName="my-8" />

          <h2 className="text-2xl font-bold my-4">Join Rock & Stone</h2>
          <p>
            Whether you&apos;re an experienced hiker or have never spent much time outdoors, Rock & Stone 
            welcomes you. Our community is built on mutual respect, support, and a shared appreciation 
            for the natural world in Southern Colorado.
          </p>

          <div className="flex flex-wrap gap-4 pt-4 mt-4">
            <button 
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-amber-600 text-white font-medium rounded-lg hover:shadow-md transition-all duration-300 hover:scale-105"
              aria-label="Join Rock & Stone outdoor program"
            >
              Join Our Program
            </button>
            <Link 
              href="/events"
              className="px-6 py-3 border-2 border-sin-yellow text-sin-yellow font-medium rounded-lg hover:bg-sin-yellow/10 transition-all duration-300 hover:scale-105"
            >
              Upcoming Activities
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
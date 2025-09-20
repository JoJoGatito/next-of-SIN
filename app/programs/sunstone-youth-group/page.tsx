import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Rainbow, Calendar } from 'lucide-react'

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

export default function SunstoneYouthGroupPage() {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 flex items-center">
          <div className="p-3 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 bg-opacity-10 mr-4">
            <Rainbow className="w-8 h-8 text-sin-orange" aria-hidden="true" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">
            Sunstone Youth Group
          </h1>
        </div>

        <div className="relative w-full h-60 md:h-80 mb-8 rounded-xl overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 opacity-20" />
          <div className="absolute inset-0 flex items-center justify-center text-white text-xl font-bold">
            Youth Group Image Placeholder
          </div>
        </div>

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
      </div>
    </div>
  )
}
'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { AccessibleGradient } from './AccessibleGradient'

const programs = [
  {
    id: 1,
    title: "Sunstone Youth Group",
    slug: "sunstone-youth-group",
    description: "A safe and supportive space for LGBTQ+ youth to connect, learn, and grow together through weekly meetings, mentorship, and community activities.",
    color: "from-orange-400 to-orange-600",
    meetingFrequency: "Weekly meetings"
  },
  {
    id: 2,
    title: "Rock & Stone",
    slug: "rock-and-stone",
    description: "Inclusive outdoor and nature group that welcomes everyone who wants to explore and connect with the natural world. We organize accessible activities for all skill levels and abilities in Southern Colorado.",
    color: "from-yellow-400 to-amber-600",
    meetingFrequency: null
  },
  {
    id: 3,
    title: "Dis'abitch",
    slug: "disabitch",
    description: "A community that celebrates disability culture, advocates for accessibility, and creates spaces where disabled individuals can connect, share experiences, and build solidarity.",
    color: "from-red-400 to-red-600",
    meetingFrequency: null
  },
  {
    id: 4,
    title: "Cafeteria Collective",
    slug: "cafeteria-collective",
    description: "Queer meet and greet where we can share stories, food, connections, and build community.",
    color: "from-green-400 to-green-600",
    meetingFrequency: null
  },
  {
    id: 5,
    title: "Hue House",
    slug: "hue-house",
    description: "A vibrant community of BIPOC-focused discussions, meet & greets, and local events that celebrate the diversity of the queer community and its allies in Southern Colorado.",
    color: "from-purple-400 to-purple-600",
    meetingFrequency: "Monthly meetings"
  },
]

export default function ModernProgramCards() {
  const [expandedId, setExpandedId] = useState<number | null>(null)

  const toggle = (id: number) => {
    setExpandedId((prev) => (prev === id ? null : id))
  }

  return (
    <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
            Our <AccessibleGradient text="Programs" />
          </h2>
          <p className="text-muted-foreground text-lg">
            Five pathways to inclusivity and community empowerment in Southern Colorado
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {programs.map((program) => {
            const isExpanded = expandedId === program.id
            return (
              <div
                key={program.id}
                role="button"
                tabIndex={0}
                aria-expanded={isExpanded}
                aria-label={`${program.title} card. ${isExpanded ? 'Collapse' : 'Expand to read more'}`}
                onClick={() => toggle(program.id)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault()
                    toggle(program.id)
                  }
                }}
                className="group relative block rounded-xl border border-zinc-200 bg-white shadow-none px-4 py-4 active:scale-[0.99] transition-transform dark:border-zinc-700 dark:bg-zinc-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/60"
                style={{ touchAction: 'manipulation' }}
              >
                {/* Static left stripe accent */}
                <span
                  className={`pointer-events-none absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b ${program.color}`}
                  aria-hidden="true"
                />

                <div className="pl-3">
                  <h3 className="text-[clamp(1.125rem,1.8vw,1.25rem)] font-semibold text-zinc-900 dark:text-zinc-100">
                    {program.title}
                  </h3>

                  <p
                    className={`mt-1 text-sm text-zinc-600 dark:text-zinc-400 ${isExpanded ? '' : 'line-clamp-2'}`}
                  >
                    {program.description}
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {program.meetingFrequency && (
                      <span
                        className="rounded-full border border-zinc-200 px-2.5 py-1 text-xs text-zinc-700 dark:border-zinc-700 dark:text-zinc-300"
                      >
                        {program.meetingFrequency}
                      </span>
                    )}
                  </div>

                  <div className="mt-4 flex items-center gap-1 text-sm text-blue-600 dark:text-blue-400">
                    <Link
                      href={`/programs/${program.slug}`}
                      className="inline-flex items-center gap-1"
                      aria-label={`Learn more about ${program.title} program`}
                      onClick={(e) => {
                        // Prevent card toggle when tapping the CTA
                        e.stopPropagation()
                      }}
                    >
                      <span className="font-medium">Learn more</span>
                      <ArrowRight className="h-4 w-4 transition-transform group-active:translate-x-px motion-reduce:transition-none" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

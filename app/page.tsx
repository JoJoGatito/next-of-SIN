import ModernHeroSection from '@/components/ModernHeroSection'
import ModernProgramCards from '@/components/ModernProgramCards'
import InteractiveEventsTimeline from '@/components/InteractiveEventsTimeline'
import Sponsors from '@/components/Sponsors'
import OrbField from '@/components/OrbField'
import { ExternalLink } from '@/components/ExternalLink'
import { MessageCircle } from 'lucide-react'
import { client } from '@/lib/sanity.client'
import { upcomingEventsQuery } from '@/lib/queries'
import DonateButton from '@/components/DonateButton'

export const revalidate = 60

type SanityEvent = {
  _id: string
  title?: string
  start?: string
  end?: string
  location?: string
  program?: string
  description?: string
  capacity?: number
}

export default async function Home() {
  let raw: SanityEvent[] = []
  try {
    raw = await client.fetch<SanityEvent[]>(upcomingEventsQuery)
  } catch (err) {
    console.error('[Home] Sanity fetch failed', err)
  }

  const valid = (raw || []).filter((e): e is SanityEvent & { start: string } => typeof e.start === 'string' && e.start.length > 0)

  const transformed = valid.map((e) => ({
    id: e._id,
    title: e.title ?? 'Untitled Event',
    start: e.start,
    end: e.end,
    location: e.location,
    program: e.program,
    description: e.description ?? '',
    capacity: e.capacity,
  }))

  console.log('[Home] upcoming events', { total: raw?.length ?? 0, valid: valid.length, transformed: transformed.length })

  return (
    <div className="min-h-screen relative">
      <ModernHeroSection />
      
      <div className="relative bg-transparent">
      
      {/* Rainbow Divider */}
      <div
        className="h-1 rainbow-bar"
        style={{
          background: 'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
        }}
        aria-hidden="true"
        role="presentation"
      />
      
      <section className="relative overflow-hidden dark:bg-transparent">
        <OrbField seed="programs" count={3} />
        <div className="relative z-10">
          <ModernProgramCards />
        </div>
      </section>
      
      {/* Rainbow Divider */}
      <div
        className="h-1 rainbow-bar"
        style={{
          background: 'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
        }}
        aria-hidden="true"
        role="presentation"
      />
      
      {/* Discord Invite Section */}
      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-transparent dark:bg-transparent text-foreground dark:text-white relative overflow-hidden">
        <OrbField seed="discord" count={3} />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Join our Discord
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-4 sm:px-0 text-foreground/90 dark:text-gray-100">
            Connect with the community, get updates, and find your people.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <ExternalLink
              href="https://discord.gg/5XeapVWHVv"
              className="bg-white text-blue-700 px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/95 transition-all hover:scale-105 hover:shadow-xl text-base sm:text-lg inline-flex items-center gap-2 border-2 border-transparent hover:border-white/20"
              ariaLabel="Join our Discord (opens in new tab)"
            >
              <MessageCircle className="w-5 h-5" />
              Join our Discord
            </ExternalLink>
          </div>
        </div>
      </section>

      {/* Rainbow Divider */}
      <div
        className="h-1 rainbow-bar"
        style={{
          background: 'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
        }}
        aria-hidden="true"
        role="presentation"
      />

      <InteractiveEventsTimeline events={transformed} />

      {/* Rainbow Divider */}
      <div
        className="h-1 rainbow-bar"
        style={{
          background: 'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
        }}
        aria-hidden="true"
        role="presentation"
      />

      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-transparent dark:bg-transparent text-foreground dark:text-white relative overflow-hidden">
        {/* Background pattern for visual interest */}
        <OrbField seed="donate" count={3} />
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-foreground dark:text-sin-yellow">
            Support Our Mission
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 px-4 sm:px-0 text-foreground/90 dark:text-gray-100">
            Your donation helps us build a more inclusive community for everyone
          </p>
          <p className="text-sm sm:text-base mb-6 sm:mb-8 px-4 sm:px-0 text-foreground/80 dark:text-gray-200">
            As a 501(c)(3) nonprofit, your contribution is tax-deductible and directly supports our programs for queer, disabled, and BIPOC communities.
          </p>
          <div id="donate" className="flex justify-center px-4 sm:px-0">
            <DonateButton />
          </div>
        </div>
      </section>

      {/* Rainbow Divider */}
      <div
        className="h-1 rainbow-bar"
        style={{
          background: 'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
        }}
        aria-hidden="true"
        role="presentation"
      />

      <Sponsors />
      </div>
    </div>
  )
}
import ModernHeroSection from '@/components/ModernHeroSection'
import ModernProgramCards from '@/components/ModernProgramCards'
import InteractiveEventsTimeline from '@/components/InteractiveEventsTimeline'
import ModernArtistsGallery from '@/components/ModernArtistsGallery'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <ModernHeroSection />
      
      <ModernProgramCards />
      
      <InteractiveEventsTimeline />

      <ModernArtistsGallery />

      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-sin-orange text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Support Our Mission
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 px-4 sm:px-0">
            Your donation helps us build a more inclusive community for everyone
          </p>
          <p className="text-sm sm:text-base mb-6 sm:mb-8 px-4 sm:px-0 opacity-90">
            As a 501(c)(3) nonprofit, your contribution is tax-deductible and directly supports our programs for queer, disabled, and BIPOC communities.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <a href="/donate" className="bg-white/90 backdrop-blur text-sin-orange px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white transition-all hover:scale-105 hover:shadow-xl text-base sm:text-lg inline-block">
              Make a Donation
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
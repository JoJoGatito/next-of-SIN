import ModernHeroSection from '@/components/ModernHeroSection'
import ModernProgramCards from '@/components/ModernProgramCards'
import InteractiveEventsTimeline from '@/components/InteractiveEventsTimeline'
import ModernArtistsGallery from '@/components/ModernArtistsGallery'
import AnimatedBackground from '@/components/AnimatedBackground'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />
      <ModernHeroSection />
      
      <ModernProgramCards />
      
      <InteractiveEventsTimeline />

      <ModernArtistsGallery />

      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-sin-orange text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Get Involved
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-6 sm:mb-8 px-4 sm:px-0">
            Join us in building a more inclusive community for everyone
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center px-4 sm:px-0">
            <button className="bg-white/90 backdrop-blur text-sin-orange px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white transition-all hover:scale-105 hover:shadow-xl text-sm sm:text-base">
              Volunteer
            </button>
            <button className="bg-transparent border-2 border-white/90 backdrop-blur px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white hover:text-sin-orange transition-all hover:scale-105 hover:shadow-xl text-sm sm:text-base">
              Donate
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
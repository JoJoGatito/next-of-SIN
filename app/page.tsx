import ModernHeroSection from '@/components/ModernHeroSection'
import ModernProgramCards from '@/components/ModernProgramCards'
import InteractiveEventsTimeline from '@/components/InteractiveEventsTimeline'
import ModernArtistsGallery from '@/components/ModernArtistsGallery'
import Sponsors from '@/components/Sponsors'

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <ModernHeroSection />
      
      {/* Rainbow Divider */}
      <div 
        className="h-1 rainbow-bar"
        style={{
          background: 'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
        }}
        aria-hidden="true"
        role="presentation"
      />
      
      <ModernProgramCards />
      
      {/* Rainbow Divider */}
      <div 
        className="h-1 rainbow-bar"
        style={{
          background: 'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
        }}
        aria-hidden="true"
        role="presentation"
      />
      
      <InteractiveEventsTimeline />
      
      {/* Rainbow Divider */}
      <div 
        className="h-1 rainbow-bar"
        style={{
          background: 'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
        }}
        aria-hidden="true"
        role="presentation"
      />

      <ModernArtistsGallery />

      {/* Rainbow Divider */}
      <div 
        className="h-1 rainbow-bar"
        style={{
          background: 'linear-gradient(90deg, #ff0000 0%, #ff7a00 14%, #ffd600 28%, #48ff00 42%, #00ffd5 57%, #002bff 71%, #7a00ff 85%, #ff00c8 100%)',
        }}
        aria-hidden="true"
        role="presentation"
      />

      <section className="py-12 sm:py-16 px-4 md:px-8 lg:px-16 bg-gradient-to-r from-sin-orange to-sin-yellow dark:from-gray-800 dark:to-gray-900 text-white relative overflow-hidden">
        {/* Background pattern for visual interest */}
        <div className="absolute inset-0" aria-hidden="true">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-white dark:bg-sin-orange/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 dark:opacity-30 animate-float"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-white dark:bg-sin-yellow/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 dark:opacity-30 animate-float-delayed"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-white dark:bg-sin-orange/20 rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-xl opacity-10 dark:opacity-30 animate-float-slow"></div>
        </div>
        
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6 text-white dark:text-sin-yellow">
            Support Our Mission
          </h2>
          <p className="text-base sm:text-lg md:text-xl mb-4 px-4 sm:px-0 text-white/95 dark:text-gray-100">
            Your donation helps us build a more inclusive community for everyone
          </p>
          <p className="text-sm sm:text-base mb-6 sm:mb-8 px-4 sm:px-0 text-white/90 dark:text-gray-200">
            As a 501(c)(3) nonprofit, your contribution is tax-deductible and directly supports our programs for queer, disabled, and BIPOC communities.
          </p>
          <div className="flex justify-center px-4 sm:px-0">
            <a 
              href="/donate" 
              className="bg-white dark:bg-sin-orange text-sin-orange dark:text-white px-8 sm:px-10 py-3 sm:py-4 rounded-lg font-semibold hover:bg-white/95 dark:hover:bg-sin-yellow dark:hover:text-gray-900 transition-all hover:scale-105 hover:shadow-xl text-base sm:text-lg inline-block border-2 border-transparent hover:border-white/20 dark:hover:border-white/20"
            >
              Make a Donation
            </a>
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
  )
}
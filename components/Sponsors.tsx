'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import OrbField from '@/components/OrbField'

interface Sponsor {
  name: string
  logo: string
  url?: string
}

const sponsors: Sponsor[] = [
   {
     name: 'SCEA',
     logo: '/assets/images/sponsors/SCEA.webp',
     url: 'https://www.socoequality.org/'
   },
   {
     name: 'PMG RANTE',
     logo: '/assets/images/sponsors/pmgrantte.webp',
     url: 'https://rougesupportnetwork.org/pmgrante'
   }
 ]

export default function Sponsors() {
  return (
    <section className="relative overflow-hidden py-8 sm:py-10 px-4 md:px-8 lg:px-16 bg-transparent dark:bg-transparent">
      <OrbField seed="sponsors" count={3} />
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 sm:mb-8"
        >
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2 text-foreground">
            Our Sponsors
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto px-4 sm:px-0">
            Thank you to our sponsors for supporting our mission
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
          {sponsors.map((sponsor, index) => (
            <motion.div
              key={sponsor.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-center justify-center"
            >
              {sponsor.url ? (
                <a
                  href={sponsor.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 sm:p-4 bg-card dark:bg-card/80 backdrop-blur-sm rounded-lg shadow-sm hover:shadow-md dark:shadow-gray-900/50 transition-all duration-300 group border border-border/50 hover:border-sin-orange/30"
                  aria-label={`Visit ${sponsor.name} website`}
                >
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 group-hover:scale-105 transition-transform duration-300">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                    />
                  </div>
                </a>
              ) : (
                <div className="block p-3 sm:p-4 bg-card dark:bg-card/80 backdrop-blur-sm rounded-lg shadow-sm dark:shadow-gray-900/50 border border-border/50">
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28">
                    <Image
                      src={sponsor.logo}
                      alt={`${sponsor.name} logo`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 80px, (max-width: 768px) 96px, 112px"
                    />
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-6 sm:mt-8"
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Interested in becoming a sponsor?
            </p>
            <a
              href="/#donate"
              className="inline-block bg-sin-orange text-white px-4 sm:px-6 py-1.5 sm:py-2 rounded-lg font-semibold hover:bg-opacity-90 transition-all hover:scale-105 hover:shadow-xl text-xs sm:text-sm"
            >
              Learn More
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
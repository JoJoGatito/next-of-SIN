'use client'

import Image from 'next/image'

export default function ModernHeroSection() {
  return (
    <section className="relative w-full bg-gray-100 dark:bg-gray-900">
      {/* Container - responsive height on mobile, 16:9 aspect ratio on desktop */}
      <div className="relative w-full min-h-[60vh] h-[calc(100vh-10rem)] md:h-auto md:aspect-video">
        {/* Desktop Light mode image */}
        <Image
          src="/assets/images/banner/daymode.webp"
          alt="Sunstone Inclusivity Network"
          fill
          className="object-contain hidden sm:block dark:sm:hidden animate-fade-in"
          priority
          quality={100}
          sizes="100vw"
        />
        
        {/* Desktop Dark mode image */}
        <Image
          src="/assets/images/banner/nightmode.webp"
          alt="Sunstone Inclusivity Network"
          fill
          className="object-contain hidden dark:sm:block animate-fade-in"
          priority
          quality={100}
          sizes="100vw"
        />
        
        {/* Mobile Light mode image */}
        <Image
          src="/assets/images/banner/daymode-mobile.webp"
          alt="Sunstone Inclusivity Network"
          fill
          className="object-contain object-center block sm:hidden dark:hidden animate-fade-in"
          priority
          quality={100}
          sizes="100vw"
        />
        
        {/* Mobile Dark mode image */}
        <Image
          src="/assets/images/banner/nightmode-mobile.webp"
          alt="Sunstone Inclusivity Network"
          fill
          className="object-contain object-center hidden dark:block dark:sm:hidden animate-fade-in"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>
    </section>
  )
}

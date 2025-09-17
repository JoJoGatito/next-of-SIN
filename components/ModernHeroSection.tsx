'use client'

import Image from 'next/image'

export default function ModernHeroSection() {
  return (
    <section className="relative w-full bg-gray-100 dark:bg-gray-900">
      {/* Container - full viewport height on mobile, 16:9 aspect ratio on desktop */}
      <div className="relative w-full h-[85vh] sm:h-auto sm:aspect-video">
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
          className="object-cover block sm:hidden dark:hidden animate-fade-in"
          priority
          quality={100}
          sizes="100vw"
        />
        
        {/* Mobile Dark mode image */}
        <Image
          src="/assets/images/banner/nightmode-mobile.webp"
          alt="Sunstone Inclusivity Network"
          fill
          className="object-cover hidden dark:block dark:sm:hidden animate-fade-in"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>
    </section>
  )
}

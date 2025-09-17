'use client'

import Image from 'next/image'

export default function ModernHeroSection() {
  return (
    <section className="relative w-full bg-gray-100 dark:bg-gray-900">
      {/* Container that maintains 16:9 aspect ratio */}
      <div className="relative w-full aspect-video" style={{ aspectRatio: '16 / 9' }}>
        {/* Light mode image */}
        <Image
          src="/assets/images/banner/daymode.webp"
          alt="Sunstone Inclusivity Network"
          fill
          className="object-contain dark:hidden animate-fade-in"
          priority
          quality={100}
          sizes="100vw"
        />
        
        {/* Dark mode image */}
        <Image
          src="/assets/images/banner/nightmode.webp"
          alt="Sunstone Inclusivity Network"
          fill
          className="object-contain hidden dark:block animate-fade-in"
          priority
          quality={100}
          sizes="100vw"
        />
      </div>
    </section>
  )
}

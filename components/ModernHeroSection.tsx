'use client'

import Image from 'next/image'
import { useReducedMotion } from '@/lib/useReducedMotion'

export default function ModernHeroSection() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section className="relative w-full bg-gray-100 dark:bg-transparent">
      {/* Container - no fixed height on mobile; 16:9 on desktop */}
      <div className="relative w-full sm:aspect-video">
        {/* Desktop Light mode image */}
        <Image
          src="/assets/images/banner/daymode.webp"
          alt="Sunstone Inclusivity Network - Building bridges of support and celebration for queer, disabled, and BIPOC communities in Southern Colorado"
          fill
          className={`object-contain hidden sm:block dark:sm:hidden ${prefersReducedMotion ? '' : 'animate-fade-in'}`}
          priority
          quality={100}
          sizes="100vw"
        />
        
        {/* Desktop Dark mode image */}
        <Image
          src="/assets/images/banner/nightmode.webp"
          alt="Sunstone Inclusivity Network - Building bridges of support and celebration for queer, disabled, and BIPOC communities in Southern Colorado"
          fill
          className={`object-contain hidden dark:sm:block ${prefersReducedMotion ? '' : 'animate-fade-in'}`}
          priority
          quality={100}
          sizes="100vw"
        />

        {/* Mobile Light mode image - intrinsic ratio so it fills width and scales height */}
        <Image
          src="/assets/images/banner/daymode-mobile.webp"
          alt="Sunstone Inclusivity Network - Building bridges of support and celebration for queer, disabled, and BIPOC communities in Southern Colorado"
          width={1320}
          height={2868}
          className={`w-full h-auto block sm:hidden dark:hidden ${prefersReducedMotion ? '' : 'animate-fade-in'}`}
          priority
          quality={100}
          sizes="100vw"
        />

        {/* Mobile Dark mode image - intrinsic ratio */}
        <Image
          src="/assets/images/banner/nightmode-mobile.webp"
          alt="Sunstone Inclusivity Network - Building bridges of support and celebration for queer, disabled, and BIPOC communities in Southern Colorado"
          width={1320}
          height={2868}
          className={`w-full h-auto hidden dark:block dark:sm:hidden ${prefersReducedMotion ? '' : 'animate-fade-in'}`}
          priority
          quality={100}
          sizes="100vw"
        />
      </div>
    </section>
  )
}

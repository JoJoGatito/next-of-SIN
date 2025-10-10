'use client'

import Image from 'next/image'
import { SanityProgramGallery, SanityGalleryImage } from '@/lib/queries'

interface GalleryBentoProps {
  gallery: SanityProgramGallery | null
  isLoading?: boolean
  className?: string
  priority?: boolean
}

// Loading skeleton component
const GallerySkeleton = () => (
  <div className="grid grid-cols-1 gap-4 md:block md:columns-3 lg:columns-4 md:[column-gap:1rem]">
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className={`bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse mb-4 ${
          index % 3 === 0
            ? 'aspect-[4/3]'
            : index % 3 === 1
            ? 'aspect-[3/4]'
            : 'aspect-square'
        }`}
      />
    ))}
  </div>
)

// Empty state component
const GalleryEmpty = ({ className = '' }: { className?: string }) => (
  <div className={`text-center py-12 ${className}`}>
    <div className="text-gray-500 dark:text-gray-400 text-lg mb-2">
      No images in gallery
    </div>
    <p className="text-sm text-gray-400 dark:text-gray-500">
      {"Images will appear here once they're added to this program gallery."}
    </p>
  </div>
)

// Individual image component with proper aspect ratio handling
const GalleryImage = ({
  image,
  alt,
  caption,
  aspectRatio,
  priority = false
}: {
  image: SanityGalleryImage['image']
  alt: string
  caption?: string
  aspectRatio: 'square' | 'wide' | 'tall'
  priority?: boolean
}) => {
  // Grid sizing (only relevant on small screens where we still use grid)
  const getGridClasses = () => {
const baseClasses = 'relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800 mb-4 break-inside-avoid'

    switch (aspectRatio) {
      case 'wide':
        return `${baseClasses} md:col-span-2`
      case 'tall':
        return `${baseClasses} md:col-span-2`
      default: // square
        return `${baseClasses} md:col-span-1`
    }
  }

  const width = image.asset.metadata?.dimensions?.width || 1
  const height = image.asset.metadata?.dimensions?.height || 1

  return (
    <div className={getGridClasses()}>
      <div className="relative">
        <Image
          src={image.asset.url}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto block rounded-lg transition-transform duration-300 hover:scale-[1.01]"
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          quality={85}
        />
        {caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 backdrop-blur-sm">
            <p className="text-sm leading-relaxed">{caption}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function GalleryBento({
  gallery,
  isLoading = false,
  className = '',
  priority = false
}: GalleryBentoProps) {
  // Show loading skeleton
  if (isLoading) {
    return (
      <div className={`w-full ${className}`}>
        <GallerySkeleton />
      </div>
    )
  }

  // Show empty state if no gallery or no images
  if (!gallery || !gallery.images || gallery.images.length === 0) {
    return (
      <div className={`w-full ${className}`}>
        <GalleryEmpty />
      </div>
    )
  }

  return (
    <div className={`w-full ${className}`}>
      <div className="mb-6">
        <p className="text-gray-600 dark:text-gray-300">
          {gallery.images.length} image{gallery.images.length !== 1 ? 's' : ''}
        </p>
      </div>

      <div
        className="grid grid-cols-1 gap-4 md:block md:columns-3 lg:columns-4 md:[column-gap:1rem]"
        role="region"
        aria-label="Program photo gallery"
      >
        {gallery.images.map((galleryImage, index) => (
          <GalleryImage
            key={galleryImage.image.asset._id}
            image={galleryImage.image}
            alt={galleryImage.alt}
            caption={galleryImage.caption}
            aspectRatio={galleryImage.aspectRatio}
            priority={priority && index < 3} // Prioritize first 3 images
          />
        ))}
      </div>
    </div>
  )
}

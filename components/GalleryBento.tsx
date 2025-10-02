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
  <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr">
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className={`bg-gray-200 dark:bg-gray-800 rounded-lg animate-pulse ${
          index % 3 === 0 ? 'md:col-span-2 md:row-span-1' : // wide
          index % 3 === 1 ? 'md:col-span-1 md:row-span-2' : // tall
          'md:col-span-1 md:row-span-1' // square
        }`}
        style={{
          aspectRatio: index % 3 === 0 ? '16/9' : index % 3 === 1 ? '9/16' : '1/1'
        }}
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
      Images will appear here once they're added to this program gallery.
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
  // Get the aspect ratio classes for the grid item
  const getGridClasses = () => {
    const baseClasses = 'relative overflow-hidden rounded-lg bg-gray-100 dark:bg-gray-800'

    switch (aspectRatio) {
      case 'wide':
        return `${baseClasses} md:col-span-2 md:row-span-1`
      case 'tall':
        return `${baseClasses} md:col-span-1 md:row-span-2`
      default: // square
        return `${baseClasses} md:col-span-1 md:row-span-1`
    }
  }

  // Get aspect ratio for the image itself
  const getAspectRatio = () => {
    switch (aspectRatio) {
      case 'wide':
        return '16/9'
      case 'tall':
        return '9/16'
      default:
        return '1/1'
    }
  }

  return (
    <div className={getGridClasses()}>
      <div
        className="relative w-full h-full"
        style={{ aspectRatio: getAspectRatio() }}
      >
        <Image
          src={image.asset.url}
          alt={alt}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
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
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          {gallery.title}
        </h2>
        <p className="text-gray-600 dark:text-gray-300">
          {gallery.images.length} image{gallery.images.length !== 1 ? &apos;s : ''}
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-fr"
        role="region"
        aria-label={`${gallery.title} gallery`}
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
'use client'

import { useState } from 'react'
import Image from 'next/image'
import type { Image as ImageType } from '@/typings'

export default function ProjectImages({
  images,
  cover = false,
}: {
  images: ImageType[]
  cover?: boolean
}) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const currentImage = images[currentIndex] || null

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % images.length)
  }

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + images.length) % images.length)
  }

  const asset = currentImage?.asset || null
  const { width, height } = asset.metadata.dimensions

  return (
    <figure style={{ position: 'relative', height: cover ? '100%' : 'auto' }}>
      <Image
        blurDataURL={asset.metadata.lqip}
        placeholder="blur"
        src={asset.url}
        loading="lazy"
        alt={asset.altText || ''}
        className="z-10"
        {...(cover
          ? { layout: 'fill', objectFit: 'cover' }
          : { width, height, style: { display: 'block', aspectRatio: width / height } })}
      />
      {asset.description ? (
        <figcaption className="p-4 text-sm md:p-8 absolute top-0 lg:top-auto lg:bottom-0 bg-blend-difference left-0 z-20 text-yellow">
          {asset.description}
        </figcaption>
      ) : null}
      <nav className="absolute flex text-3xl h-full w-full items-center justify-between z-20 text-yellow font-bold">
        <button
          className="w-1/2 p-4 md:p-8 h-full cursor-w-resize flex items-center justify-start"
          aria-label="Previous image"
          onClick={handlePrev}
        >
          <span>&larr;</span>
        </button>
        <button
          className="w-1/2 p-4 md:p-8 h-full cursor-e-resize flex items-center justify-end"
          aria-label="Next image"
          onClick={handleNext}
        >
          &rarr;
        </button>
      </nav>
    </figure>
  )
}

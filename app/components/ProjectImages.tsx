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
    <figure
      className={cover ? 'aspect-square sm:aspect-auto sm:h-full w-full' : 'h-auto'}
      style={{ position: 'relative' }}
    >
      <Image
        blurDataURL={asset.metadata.lqip}
        placeholder="blur"
        src={asset.url}
        loading="lazy"
        alt={asset.altText || ''}
        className="z-10 object-cover"
        quality={95}
        sizes="(max-width: 1023px) 200vw, 200vh"
        {...(cover
          ? { layout: 'fill' }
          : { width, height, style: { display: 'block', aspectRatio: width / height } })}
      />
      {/* {asset.description ? ( */}
      <figcaption className="fixed bottom-0 left-0 px-2 max-w-[80vw] leading-none md:px-4 py-2 md:my-4 text-black z-[60]">
        <span className="italic"> {asset.title}:</span> {asset.description}
      </figcaption>
      {/* ) : null} */}
      <nav className="absolute flex text-3xl h-full w-full items-center justify-between z-20 text-white font-bold">
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

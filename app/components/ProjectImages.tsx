'use client'

import { useState, useEffect, useContext } from 'react'
import Image from 'next/image'
import type { Image as ImageType, Project } from '@/typings'
import { PortableTextBlock } from 'sanity'
import { SanityImageAssetDocument } from 'next-sanity'
import { CanvasContext } from './Context'

type ProjectImage = {
  title: string
  text: PortableTextBlock[]
  _type: 'image'
  asset: SanityImageAssetDocument
  layout: 'cover' | 'contain'
}

export default function ProjectImages({ projects }: { projects: Project[] }) {
  const { setFooterText } = useContext(CanvasContext)
  const projectImages: ProjectImage[] = projects
    .map((project) => {
      return project.projectImages?.map((image) => {
        return {
          title: project.title,
          text: project.text,
          _type: 'image',
          asset: image.image.asset,
          layout: image.layout,
        }
      })
    })
    .flat()
    .filter((image): image is ProjectImage => image !== undefined)

  console.log(projectImages)

  const [currentIndex, setCurrentIndex] = useState(0)

  const currentImage = projectImages[currentIndex] || null

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % projectImages.length)
  }

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + projectImages.length) % projectImages.length)
  }

  const asset = currentImage?.asset || null
  const { width, height } = asset.metadata.dimensions

  const cover = currentImage.layout == 'cover'

  useEffect(() => {
    setFooterText(asset.description)
    console.log(asset.description)
  }, [currentImage])

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
        className="z-10 object-contain"
        quality={95}
        sizes="(max-width: 1023px) 200vw, 200vh"
        {...(cover
          ? { layout: 'fill' }
          : { width, height, style: { display: 'block', aspectRatio: width / height } })}
      />
      {/* {asset.description ? ( */}
      {/* <figcaption className="fixed bottom-0 left-0 px-2 text-xs max-w-[80vw] leading-none md:px-4 py-2 md:my-4 text-black z-[60]">
        <span className="italic"> {asset.title}:</span> {asset.description}
      </figcaption> */}
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

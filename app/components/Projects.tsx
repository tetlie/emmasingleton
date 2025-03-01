'use client'

import { useState, useEffect, useContext, useMemo } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { EmblaOptionsType } from 'embla-carousel'
import type { ProjectImage, Project, Image as ImageType } from '@/typings'
import { CanvasActionsContext } from './Context'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'
import ProjectNavigation from './ProjectNavigation'
import Fade from 'embla-carousel-fade'

// Create a clean type that borrows exactly what you need
type MappedProjectImage = {
  index: number
  title: Project['title']
  text?: Project['text']
  asset: ImageType
  layout: ProjectImage['layout']
}

export default function Projects({ projects }: { projects: Project[] }) {
  const { setFooterText, setProjectDescription, setDescriptionIsOpen } =
    useContext(CanvasActionsContext)

  const projectImages: MappedProjectImage[] = useMemo(() => {
    return projects
      .flatMap((project) =>
        project.projectImages?.map((image, index) => ({
          index,
          title: project.title,
          text: project.text,
          asset: image.image.asset,
          layout: image.layout,
        }))
      )
      .filter((image): image is Exclude<typeof image, undefined> => image !== undefined)
  }, [projects])

  const [currentIndex, setCurrentIndex] = useState(0)

  const options: EmblaOptionsType = {
    loop: true,
    duration: 5,
    containScroll: false,
    align: 'center',
  }

  const [emblaRef, emblaApi] = useEmblaCarousel(options, [Fade()])

  const emblaFadeClass = 'embla-fade'

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setCurrentIndex(emblaApi.selectedScrollSnap())
      setDescriptionIsOpen(false)
    }

    emblaApi.on('select', onSelect)
    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi, setDescriptionIsOpen])

  // Update project info when currentIndex changes
  useEffect(() => {
    const currentImage = projectImages[currentIndex]
    if (currentImage?.title) {
      setFooterText(currentImage.title)
    }
    if (currentImage?.text) {
      setProjectDescription(currentImage.text)
    }
  }, [currentIndex, projectImages, setFooterText, setProjectDescription])

  const handleNext = () => emblaApi?.scrollNext()
  const handlePrev = () => emblaApi?.scrollPrev()

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className={`h-full w-full ${emblaFadeClass}`} ref={emblaRef}>
        <div className="h-full flex">
          {projectImages.map((image) => {
            const {
              layout,
              asset,
              asset: { metadata: { lqip = '', dimensions } = {}, altText = '' },
            } = image
            const { width, height } = dimensions ?? {}
            const src = urlForImage(asset) ?? ''
            const isCover = layout === 'cover'
            return (
              <div
                key={src}
                className="flex-[0_0_100%] w-full h-full relative flex items-center justify-center"
              >
                <figure
                  className={`relative w-full overflow-hidden ${
                    isCover
                      ? 'h-full'
                      : 'aspect-square sm:aspect-auto sm:h-full flex items-center justify-center'
                  }`}
                >
                  <Image
                    src={src}
                    priority
                    blurDataURL={lqip}
                    placeholder="blur"
                    alt={altText}
                    sizes={'200vw'}
                    className={`block z-10 max-w-full ${
                      isCover ? 'object-cover' : 'object-cover lg:object-contain'
                    }`}
                    fill
                    style={{
                      aspectRatio: !isCover && width && height ? `${width} / ${height}` : undefined,
                    }}
                  />
                </figure>
              </div>
            )
          })}
        </div>
      </div>

      <ProjectNavigation onNext={handleNext} onPrev={handlePrev} />
    </div>
  )
}

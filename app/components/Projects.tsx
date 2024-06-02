'use client'

import { useState, useEffect, useContext, useMemo } from 'react'
import type { Project } from '@/typings'
import { CanvasActionsContext } from './Context'
import ProjectNavigation from './ProjectNavigation'
import ProjectImage from './ProjectImage'

export default function Projects({ projects }: { projects: Project[] }) {
  const { setFooterText } = useContext(CanvasActionsContext)

  const projectImages = useMemo(() => {
    return projects
      .flatMap((project) =>
        project.projectImages?.map((image) => ({
          title: project.title,
          text: project.text,
          asset: image.image.asset,
          layout: image.layout,
        }))
      )
      .filter((image): image is Exclude<typeof image, undefined> => image !== undefined)
  }, [projects])

  const [currentIndex, setCurrentIndex] = useState(0)
  const currentImage = projectImages[currentIndex] || null

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % projectImages.length)
  }

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + projectImages.length) % projectImages.length)
  }

  useEffect(() => {
    if (currentImage?.text) {
      setFooterText(currentImage.text)
    }
  }, [currentImage, setFooterText])

  if (!currentImage) {
    return null
  }

  return (
    <div className="relative h-full max-h-max w-full overflow-hidden flex items-center justify-center">
      <ProjectImage asset={currentImage.asset} layout={currentImage.layout} />
      <ProjectNavigation onNext={handleNext} onPrev={handlePrev} />
    </div>
  )
}

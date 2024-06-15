'use client'

import { useState, useEffect, useContext, useMemo } from 'react'
import type { Project } from '@/typings'
import { CanvasActionsContext } from './Context'
import ProjectNavigation from './ProjectNavigation'
import ProjectImage from './ProjectImage'

import { motion, AnimatePresence, type Variants } from 'framer-motion'

export default function Projects({ projects }: { projects: Project[] }) {
  const { setFooterText, setProjectDescription, setDescriptionIsOpen } =
    useContext(CanvasActionsContext)

  const projectImages = useMemo(() => {
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
  const currentImage = projectImages[currentIndex] || null

  const handleNext = () => {
    setCurrentIndex((currentIndex + 1) % projectImages.length)
    setDescriptionIsOpen(false)
  }

  const handlePrev = () => {
    setCurrentIndex((currentIndex - 1 + projectImages.length) % projectImages.length)
    setDescriptionIsOpen(false)
  }

  useEffect(() => {
    if (currentImage?.title) {
      setFooterText(currentImage.title)
    }
    if (currentImage?.text) {
      setProjectDescription(currentImage.text)
    }
  }, [currentImage.title, currentImage.text, setFooterText, setProjectDescription])

  if (!currentImage) {
    return null
  }

  const textAnimation: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }

  return (
    <div className="relative h-full max-h-max w-full overflow-hidden ">
      <AnimatePresence mode="wait">
        <motion.div
          className="w-full h-full relative flex items-center justify-center"
          key={currentImage.index}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textAnimation}
          transition={{ duration: 0.2 }}
        >
          <ProjectImage asset={currentImage.asset} layout={currentImage.layout} />
        </motion.div>
      </AnimatePresence>

      <ProjectNavigation onNext={handleNext} onPrev={handlePrev} />
    </div>
  )
}

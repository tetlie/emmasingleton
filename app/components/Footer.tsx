'use client'

import { useContext, useEffect, useState } from 'react'
import type { Globals } from '@/typings'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { CanvasActionsContext, CanvasStateContext } from './Context'
import { PortableTextComponents } from './PortableTextComponents'
import { PortableText } from '@portabletext/react'
import { type PortableTextBlock } from 'sanity'

export default function Footer({ globals }: { globals: Globals }) {
  const { footerText, projectDescription, descriptionIsOpen, canvasIsOpen, hasDrawn } =
    useContext(CanvasStateContext)
  const { toggleCanvas, clearCanvas, setDescriptionIsOpen } = useContext(CanvasActionsContext)
  const [displayedFooterText, setDisplayedFooterText] = useState(footerText)
  const [displayedProjectDescription, setDisplayedProjectDescription] = useState<
    PortableTextBlock[]
  >([])
  const [isAnimating, setIsAnimating] = useState(false)

  const toggleDescription = () => setDescriptionIsOpen((prevState) => !prevState)

  useEffect(() => {
    if (!isAnimating) {
      setDisplayedFooterText(footerText)
      setDisplayedProjectDescription(projectDescription)
    }
  }, [footerText, projectDescription, isAnimating])

  const handleAnimationStart = () => {
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
    setDisplayedFooterText(footerText)
    setDisplayedProjectDescription(projectDescription)
  }

  const slugify = (text: string) => text.toLowerCase().split(' ').join('-')
  const generateKey = (text: PortableTextBlock[]) => text.map((block) => block._key).join('-')

  const textAnimation: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }
  return (
    <footer className="relative">
      <div
        id="description"
        className={`leading-snug pb-[57px] md:pb-[61px] pointer-events-auto bottom-0 pt-4 lg:pt-4 bg-white px-2 md:px-4 lg:px-8 absolute left-0 h-auto overflow-y-scroll w-screen transition-transform duration-300 ease-in-out z-20 ${
          descriptionIsOpen ? 'transform-none' : 'transform translate-y-[100vh]'
        }`}
      >
        <motion.div
          key={generateKey(displayedProjectDescription)}
          initial="initial"
          animate="animate"
          exit="exit"
          variants={textAnimation}
          onAnimationStart={handleAnimationStart}
          onAnimationComplete={handleAnimationComplete}
        >
          <div className="max-w-[80vw]">
            <PortableText value={displayedProjectDescription} components={PortableTextComponents} />
          </div>
        </motion.div>
      </div>
      <div className="w-full leading-none transition-height duration-150 ease-in relative flex items-center z-30 justify-between px-2 bg-white md:px-4 lg:px-8 py-3 lg:py-4">
        <AnimatePresence mode="wait">
          {canvasIsOpen &&
            (hasDrawn ? (
              <motion.button
                key="clearCanvas"
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
                variants={textAnimation}
                type="button"
                onClick={clearCanvas}
                className="underline-offset-2 decoration-1 decoration-black"
              >
                <span className="md:hidden">
                  &nbsp;
                  <br />
                </span>
                Clear canvas
              </motion.button>
            ) : (
              <motion.span
                key="drawSomething"
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.2 }}
                variants={textAnimation}
              >
                <span className="md:hidden">
                  &nbsp;
                  <br />
                </span>
                {globals?.drawingBoardText ? (
                  <PortableText
                    value={globals.drawingBoardText}
                    components={PortableTextComponents}
                  />
                ) : (
                  'Draw something.'
                )}
              </motion.span>
            ))}
          {!canvasIsOpen && (
            <motion.div
              key={slugify(displayedFooterText)}
              initial="initial"
              animate="animate"
              exit="exit"
              variants={textAnimation}
              onAnimationStart={handleAnimationStart}
              onAnimationComplete={handleAnimationComplete}
            >
              <div className="max-w-[80vw]">
                <button
                  onClick={toggleDescription}
                  aria-label={descriptionIsOpen ? 'Hide description' : 'Show description'}
                  type="button"
                >
                  <span
                    className={`block text-left transition-transform duration-500 ease-in-out underline-offset-2 decoration-1 decoration-black ${
                      descriptionIsOpen ? 'underline ' : 'hover:underline '
                    }`}
                  >
                    {displayedFooterText}
                  </span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-2 md:gap-4">
          <button
            type="button"
            aria-label={canvasIsOpen ? 'Close canvas' : 'Open canvas'}
            onClick={toggleCanvas}
          >
            <div className="size-[20px] bg-black rounded-full"></div>
          </button>
        </div>
      </div>
    </footer>
  )
}

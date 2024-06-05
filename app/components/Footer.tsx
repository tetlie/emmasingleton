'use client'

import { useContext, useEffect, useState } from 'react'
import type { Globals } from '@/typings'
import { motion, AnimatePresence, Variants } from 'framer-motion'
import { CanvasActionsContext, CanvasStateContext } from './Context'
import { PortableTextComponents } from './PortableTextComponents'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from 'sanity'

export default function Footer({ globals }: { globals: Globals }) {
  const { footerText, canvasIsOpen, hasDrawn } = useContext(CanvasStateContext)
  const { toggleCanvas, clearCanvas } = useContext(CanvasActionsContext)
  const [displayedFooterText, setDisplayedFooterText] = useState(footerText)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    if (!isAnimating) {
      setDisplayedFooterText(footerText)
    }
  }, [footerText, isAnimating])

  const handleAnimationStart = () => {
    setIsAnimating(true)
  }

  const handleAnimationComplete = () => {
    setIsAnimating(false)
    setDisplayedFooterText(footerText)
  }

  const generateKey = (text: PortableTextBlock[]) => text.map((block) => block._key).join('-')

  const textAnimation: Variants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
  }
  return (
    <footer className="w-full leading-none transition-height duration-150 ease-in text-sm md:text-lg relative flex items-end md:items-center z-30 justify-between px-2 bg-white md:px-4 lg:px-8 py-3 lg:py-4">
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
          <>
            {displayedFooterText.length > 0 ? (
              <motion.div
                key={generateKey(displayedFooterText)}
                initial="initial"
                animate="animate"
                exit="exit"
                variants={textAnimation}
                onAnimationStart={handleAnimationStart}
                onAnimationComplete={handleAnimationComplete}
              >
                <div className="max-w-[80vw]">
                  <PortableText value={displayedFooterText} components={PortableTextComponents} />
                </div>
              </motion.div>
            ) : (
              <span>
                {' '}
                <span className="md:hidden">
                  &nbsp;
                  <br />
                </span>
                Loading project...
              </span>
            )}
          </>
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
    </footer>
  )
}

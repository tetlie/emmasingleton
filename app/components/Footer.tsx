'use client'

import { useContext } from 'react'
import { CanvasActionsContext, CanvasStateContext } from './Context'

export default function Footer() {
  const { footerText, canvasIsOpen, hasDrawn } = useContext(CanvasStateContext)
  const { toggleCanvas, clearCanvas } = useContext(CanvasActionsContext)

  return (
    <footer className="w-full">
      <div
        id="footer"
        className="text-sm  relative flex items-center z-50 justify-between px-2 bg-white md:px-4 lg:px-8 py-4"
      >
        {canvasIsOpen && (
          <div>
            {hasDrawn ? (
              <button
                type="button"
                onClick={clearCanvas}
                className={`transition-transform duration-500 ease-in-out underline-offset-2 decoration-1 decoration-black ${
                  canvasIsOpen ? 'block ' : 'hidden '
                }`}
              >
                Clear canvas
              </button>
            ) : (
              <span>Draw something</span>
            )}
          </div>
        )}
        {!canvasIsOpen && <div className="max-w-[80vw]">{footerText as string}</div>}
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

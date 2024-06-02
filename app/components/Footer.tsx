'use client'

import { useContext } from 'react'
import type { Globals } from '@/typings'

import DrawingBoard from './Canvas'
import { CanvasContext } from './Context'

export default function Footer() {
  const { footerText, canvasIsOpen, toggleCanvas, hasDrawn, clearCanvas } =
    useContext(CanvasContext)

  return (
    <>
      <div
        id="drawing-board"
        className={`pt-[57px] md:pt-[61px] top-0 bg-white/40 backdrop-blur-xl absolute left-0 h-svh overflow-y-scroll w-screen transition-transform duration-300 ease-in-out z-30 ${
          canvasIsOpen ? 'transform-none' : 'transform translate-y-[100vh]'
        }`}
      >
        <DrawingBoard />
      </div>
      <footer className="absolute bottom-0 left-0 w-full">
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
          {!canvasIsOpen && <div className="max-w-[80vw]">{footerText}</div>}

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
    </>
  )
}

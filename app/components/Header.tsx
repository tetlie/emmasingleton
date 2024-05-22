'use client'

import { useState } from 'react'
import type { Globals } from '@/typings'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/app/components/PortableTextComponents'
import DrawingBoard from './Canvas'

export default function Header({ globals }: { globals: Globals }) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)
  const [canvasIsOpen, setCanvasIsOpen] = useState<boolean>(false)

  const toggleMenu = () => setMenuIsOpen((prevState) => !prevState)
  const toggleCanvas = () => setCanvasIsOpen((prevState) => !prevState)

  return (
    <>
      <header className="absolute top-0 left-0 w-full">
        <button
          type="button"
          aria-label={menuIsOpen ? 'Close menu' : 'Open menu'}
          onClick={toggleMenu}
          className="relative block text-left w-full"
        >
          <div
            id="header"
            className="w-full relative leading-none flex items-center z-50 justify-between px-2 bg-white md:px-4 lg:px-8 py-4"
          >
            <h1>{globals.title}</h1>
            <div className="flex gap-2 md:gap-4">
              <span
                className={`block transition-transform duration-500 ease-in-out underline-offset-2 decoration-1 decoration-black ${
                  menuIsOpen ? 'underline ' : 'hover:underline '
                }`}
              >
                Work, information
              </span>
              <div className="size-[20px] bg-black rounded-full"></div>
            </div>
          </div>
          <div
            id="menu"
            className={`leading-snug pt-[57px] md:pt-[61px] top-0 pb-8 lg:pb-4 bg-white absolute left-0 h-auto overflow-y-scroll w-screen transition-transform duration-300 ease-in-out z-40 ${
              menuIsOpen ? 'transform-none' : 'transform -translate-y-[100vh]'
            }`}
          >
            <ul className="flex flex-wrap justify-between gap-y-4 px-1 md:px-2 lg:px-4">
              {globals.menu?.map((section, idx) => (
                <li
                  key={`menuItem-${idx}`}
                  className={
                    idx < 2
                      ? 'w-full lg:w-1/2 p-1 md:p-2 lg:p-4'
                      : 'lg:even:text-right w-full lg:w-1/4 p-1 md:p-2 lg:p-4'
                  }
                >
                  <PortableText value={section.content} components={PortableTextComponents} />
                </li>
              ))}
            </ul>
          </div>
        </button>
      </header>
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
          className="relative flex items-center z-50 justify-between px-2 bg-white md:px-4 lg:px-8 py-4"
        >
          <div>&nbsp;</div>
          <div className="flex gap-2 md:gap-4">
            {/* <button
              type="button"
              onClick={() => clearCanvas}
              className={`transition-transform duration-500 ease-in-out underline-offset-2 decoration-1 decoration-black ${
                canvasIsOpen ? 'block ' : 'hidden '
              }`}
            >
              Clear canvas
            </button> */}
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

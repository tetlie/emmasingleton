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
        <div className="relative">
          <div
            id="header"
            className="relative flex items-center z-50 justify-between px-2 bg-white md:px-4 py-4"
          >
            <h1>{globals.title}</h1>
            <div className="flex gap-2 md:gap-4">
              <button
                type="button"
                aria-label={menuIsOpen ? 'Close menu' : 'Open menu'}
                onClick={toggleMenu}
              >
                <span
                  className={`block transition-transform duration-500 ease-in-out ${
                    menuIsOpen ? 'underline ' : ''
                  }`}
                >
                  Work, information
                </span>
              </button>
              <button
                type="button"
                aria-label={canvasIsOpen ? 'Close canvas' : 'Open canvas'}
                onClick={toggleCanvas}
              >
                <div className="size-[20px] bg-black rounded-full"></div>
              </button>
            </div>
          </div>
          <div
            id="menu"
            className={`pt-[57px] md:pt-[61px] top-0 bg-white absolute left-0 h-auto overflow-y-scroll w-screen transition-transform duration-300 ease-in-out z-40 ${
              menuIsOpen ? 'transform-none' : 'transform -translate-y-[100vh]'
            }`}
          >
            <ul className="flex flex-wrap">
              {globals.menu?.map((section, idx) => (
                <li
                  key={`menuItem-${idx}`}
                  className={idx < 2 ? 'w-full lg:w-1/2 p-2 md:p-4' : 'w-full lg:w-1/4 p-2 md:p-4'}
                >
                  <PortableText value={section.content} components={PortableTextComponents} />
                </li>
              ))}
            </ul>
          </div>
          <div
            id="drawing-board"
            className={`pt-[57px] md:pt-[61px] top-0 bg-white/40 backdrop-blur-xl absolute left-0 h-svh overflow-y-scroll w-screen transition-transform duration-300 ease-in-out z-30 ${
              canvasIsOpen ? 'transform-none' : 'transform translate-y-[100vh]'
            }`}
          >
            <DrawingBoard />
          </div>
        </div>
      </header>
      <footer className="absolute bottom-0 left-0 w-full">
        <div
          id="footer"
          className="relative flex items-center z-50 justify-between px-2 bg-white md:px-4 py-4"
        >
          <div>&nbsp;</div>
          <button
            type="button"
            aria-label={canvasIsOpen ? 'Close canvas' : 'Open canvas'}
            onClick={toggleCanvas}
          >
            <div className="size-[20px] bg-black rounded-full"></div>
          </button>
        </div>
      </footer>
    </>
  )
}

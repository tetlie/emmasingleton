'use client'

import { useEffect, useState } from 'react'
import type { Globals } from '@/typings'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/app/components/PortableTextComponents'

export default function Header({ globals }: { globals: Globals }) {
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false)

  const toggleMenu = () => setMenuIsOpen((prevState) => !prevState)

  return (
    <>
      {menuIsOpen && <div className="fixed z-40 top-0 left-0 w-screen h-svh "></div>}

      <header className="w-full relative">
        <div className="absolute top-0 left-0 block text-left bg-transparent w-full">
          <button
            type="button"
            aria-label={menuIsOpen ? 'Close menu' : 'Open menu'}
            onClick={toggleMenu}
            id="header"
            className="z-[60] pointer-events-auto bg-white w-full relative leading-none flex items-center justify-between px-2  md:px-4 lg:px-8 py-3 lg:py-4"
          >
            <h1>{globals.title}</h1>
            <div className="flex items-center justify-center gap-2 md:gap-4">
              <span
                className={`block transition-transform duration-500 ease-in-out underline-offset-2 decoration-1 decoration-black ${
                  menuIsOpen ? 'underline ' : 'hover:underline '
                }`}
              >
                Work, information
              </span>
              <div className="size-[20px] bg-black rounded-full"></div>
            </div>
          </button>
          <div
            id="menu"
            className={`leading-snug pt-[57px]  md:pt-[61px] pointer-events-auto top-0 pb-8 lg:pb-4 bg-white absolute left-0 h-svh md:h-auto overflow-y-scroll w-screen transition-transform duration-300 ease-in-out z-50 ${
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
        </div>
      </header>
    </>
  )
}

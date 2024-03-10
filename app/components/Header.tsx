'use client'

import { useState, useEffect } from 'react'
import type { Globals } from '@/typings'
import { PortableText } from '@portabletext/react'
import { PortableTextComponents } from '@/app/components/PortableTextComponents'
import ProjectImages from './ProjectImages'

export default function Header({ globals }: { globals: Globals }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // setMenuIsOpen(window.matchMedia('(min-width: 1024px)').matches)
      setMenuIsOpen(true)
    }
  }, [])

  const toggleMenu = () => setMenuIsOpen((prevState) => !prevState)

  return (
    <div className="absolute top-0 left-0 w-full">
      <div className="relative">
        <div
          id="header"
          className="relative flex items-center z-50 justify-between px-4 bg-yellow md:px-8 lg:px-20 py-4 border-b"
        >
          <h1>{globals.title}</h1>
          <button onClick={toggleMenu}>
            <span
              className={`block transition-transform duration-500 ease-in-out ${
                menuIsOpen ? 'transform rotate-180 ' : ''
              }`}
            >
              Info
            </span>
          </button>
        </div>
        <div
          id="menu"
          className={`pt-[57px] lg:border-l md:pt-[61px] top-0 bg-yellow absolute right-0 h-svh overflow-y-scroll w-screen lg:w-[50vw] transition-transform duration-500 ease-in-out z-40 ${
            menuIsOpen ? 'transform-none' : 'transform -translate-y-[100vh]'
          }`}
        >
          <section
            id="projects"
            className="w-full aspect-square md:aspect-auto md:h-full lg:hidden relative"
          >
            <h2 className="sr-only">Project</h2>
            {globals.images ? <ProjectImages images={globals.images} cover /> : null}
          </section>
          <ul>
            {globals?.mainText ? (
              <li key={`menuItem-mainText`} className="border-b last:border-none p-4 md:p-8">
                <PortableText value={globals?.mainText} components={PortableTextComponents} />
              </li>
            ) : null}
            {globals.menu?.map((section, idx) => (
              <li key={`menuItem-${idx}`} className="border-b last:border-none p-4 md:p-8">
                <PortableText value={section.content} components={PortableTextComponents} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

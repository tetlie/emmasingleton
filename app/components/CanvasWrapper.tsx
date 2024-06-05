'use client'

import { useContext } from 'react'

import Canvas from './Canvas'
import { CanvasStateContext } from './Context'

export default function CanvasWrapper() {
  const { canvasIsOpen } = useContext(CanvasStateContext)
  return (
    <div
      id="canvas-wrapper"
      className={`bg-white/40 backdrop-blur-xl absolute left-0 h-full overflow-y-scroll w-screen transition-transform duration-300 ease-in-out z-20 ${
        canvasIsOpen ? 'transform-none' : 'transform translate-y-[100vh]'
      }`}
    >
      <Canvas />
    </div>
  )
}

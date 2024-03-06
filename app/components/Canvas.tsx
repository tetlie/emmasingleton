'use client'
// import { useRef, useEffect, useState, MouseEvent as ReactMouseEvent } from 'react'

import { useRef, useEffect, useState, MouseEvent as ReactMouseEvent } from 'react'

export default function DrawingBoard() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const [hasDrawn, setHasDrawn] = useState(false)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const context = canvas.getContext('2d')
    if (!context) return

    let isDrawing = false

    function drawCircle(x: number, y: number) {
      context?.beginPath()
      context?.arc(x, y, 10, 0, 2 * Math.PI)
      context?.fill()
    }

    function getPos(event: ReactMouseEvent<HTMLCanvasElement>) {
      const rect = canvas?.getBoundingClientRect()
      return {
        x: event.clientX - (rect?.left ?? 0),
        y: event.clientY - (rect?.top ?? 0),
      }
    }

    const startDrawing: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
      isDrawing = true
      setHasDrawn(true)
      const pos = getPos(event)
      drawCircle(pos.x, pos.y)
    }

    const stopDrawing = () => {
      isDrawing = false
    }

    const moveDrawing: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
      if (!isDrawing) return
      const pos = getPos(event)
      drawCircle(pos.x, pos.y)
    }

    const resizeCanvas = () => {
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      const devicePixelRatio = window.devicePixelRatio || 1

      canvas.width = width * devicePixelRatio
      canvas.height = height * devicePixelRatio
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.scale(devicePixelRatio, devicePixelRatio)
    }

    canvas.addEventListener('mousedown', startDrawing as any)
    canvas.addEventListener('mouseup', stopDrawing as any)
    canvas.addEventListener('mousemove', moveDrawing as any)

    window.addEventListener('resize', resizeCanvas)

    resizeCanvas()

    return () => {
      canvas.removeEventListener('mousedown', startDrawing as any)
      canvas.removeEventListener('mouseup', stopDrawing as any)
      canvas.removeEventListener('mousemove', moveDrawing as any)
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="h-full w-full relative">
      {!hasDrawn && (
        <div className="absolute inset-0 flex items-center justify-center text-2xl pointer-events-none">
          Draw something
        </div>
      )}
      <canvas className="h-full w-full cursor-crosshair" ref={canvasRef}></canvas>
    </div>
  )
}

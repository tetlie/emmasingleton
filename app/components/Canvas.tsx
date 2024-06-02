'use client'

import { useRef, useEffect, MouseEvent as ReactMouseEvent, useContext } from 'react'
import { CanvasActionsContext, CanvasStateContext } from './Context'

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const { setHasDrawn, setClearCanvas } = useContext(CanvasActionsContext)

  const clearCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const context = canvas.getContext('2d')
      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height)
        setHasDrawn(false) // Optional: Reset hasDrawn state if needed
      }
    }
  }

  useEffect(() => {
    setClearCanvas(() => clearCanvas)
  }, [setClearCanvas])

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

    function getPos(
      event: ReactMouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>
    ) {
      const rect = canvas?.getBoundingClientRect()
      let x: number
      let y: number
      if ('touches' in event) {
        x = event.touches[0].clientX
        y = event.touches[0].clientY
      } else {
        x = event.clientX
        y = event.clientY
      }
      return {
        x: x - (rect?.left ?? 0),
        y: y - (rect?.top ?? 0),
      }
    }

    const startDrawing: React.MouseEventHandler<HTMLCanvasElement> = (event) => {
      if ('touches' in event) {
        event.preventDefault()
      }
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
      console.log('Resizing canvas')

      // Save the current image data
      const imageData = context.getImageData(0, 0, canvas.width, canvas.height)

      const rect = canvas?.parentElement?.getBoundingClientRect()
      const devicePixelRatio = window.devicePixelRatio || 1

      canvas.width = (rect?.width ?? 0) * devicePixelRatio
      canvas.height = (rect?.height ?? 0) * devicePixelRatio
      context.scale(devicePixelRatio, devicePixelRatio)

      // Restore the saved image data
      context.putImageData(imageData, 0, 0)
    }

    canvas.addEventListener('mousedown', startDrawing as any)
    canvas.addEventListener('mouseup', stopDrawing as any)
    canvas.addEventListener('mousemove', moveDrawing as any)

    canvas.addEventListener('touchstart', startDrawing as any)
    canvas.addEventListener('touchend', stopDrawing as any)
    canvas.addEventListener('touchmove', moveDrawing as any)

    window.addEventListener('resize', resizeCanvas)

    resizeCanvas()

    return () => {
      canvas.removeEventListener('mousedown', startDrawing as any)
      canvas.removeEventListener('mouseup', stopDrawing as any)
      canvas.removeEventListener('mousemove', moveDrawing as any)

      canvas.removeEventListener('touchstart', startDrawing as any)
      canvas.removeEventListener('touchend', stopDrawing as any)
      canvas.removeEventListener('touchmove', moveDrawing as any)

      window.removeEventListener('resize', resizeCanvas)
    }
  }, [])

  return (
    <div className="h-full w-full relative">
      <canvas className="z-10 h-full w-full cursor-crosshair" ref={canvasRef}></canvas>
    </div>
  )
}

'use client'

import { useEffect } from 'react'

type ImageNavigationProps = {
  onNext: () => void
  onPrev: () => void
}

const ImageNavigation: React.FC<ImageNavigationProps> = ({ onNext, onPrev }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') {
        onNext()
      } else if (event.key === 'ArrowLeft') {
        onPrev()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onNext, onPrev])

  return (
    <>
      <nav className="h-full absolute flex top-0 text-3xl w-full items-center justify-between z-20 text-white font-bold">
        <button
          className="w-1/2 p-4 md:p-8 h-full flex items-center justify-start"
          aria-label="Previous image"
          onClick={onPrev}
        >
          <span>&larr;</span>
        </button>
        <button
          className="w-1/2 p-4 md:p-8 h-full flex items-center justify-end"
          aria-label="Next image"
          onClick={onNext}
        >
          &rarr;
        </button>
      </nav>
    </>
  )
}

export default ImageNavigation

'use client'

import { createContext, useState, useCallback, ReactNode, Dispatch, SetStateAction } from 'react'
import { PortableTextBlock } from 'sanity'

export type CanvasContextType = {
  hasDrawn: boolean
  setHasDrawn: Dispatch<SetStateAction<boolean>>
  canvasIsOpen: boolean
  setCanvasIsOpen: Dispatch<SetStateAction<boolean>>
  toggleCanvas: () => void
  footerText: PortableTextBlock[]
  setFooterText: Dispatch<SetStateAction<PortableTextBlock[]>>
  clearCanvas: () => void
  setClearCanvas: Dispatch<SetStateAction<() => void>>
}

export const CanvasContext = createContext<CanvasContextType | null>(null)

export function AppWrapper({ children }: { children: ReactNode }) {
  const [hasDrawn, setHasDrawn] = useState<boolean>(false)
  const [canvasIsOpen, setCanvasIsOpen] = useState<boolean>(false)
  const [footerText, setFooterText] = useState<PortableTextBlock[]>([])
  const [clearCanvas, setClearCanvas] = useState<() => void>(() => () => {})

  const toggleCanvas = useCallback(() => {
    setCanvasIsOpen((prevState) => !prevState)
  }, [])

  const contextValue: CanvasContextType = {
    hasDrawn,
    setHasDrawn,
    canvasIsOpen,
    setCanvasIsOpen,
    toggleCanvas,
    footerText,
    setFooterText,
    clearCanvas,
    setClearCanvas,
  }

  return <CanvasContext.Provider value={contextValue}>{children}</CanvasContext.Provider>
}

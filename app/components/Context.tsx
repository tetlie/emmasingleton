'use client'

import {
  createContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
  useEffect,
} from 'react'
import { PortableTextBlock } from 'sanity'

export type CanvasStateType = {
  hasDrawn: boolean
  canvasIsOpen: boolean
  footerText: PortableTextBlock[]
}

export type CanvasActionsType = {
  setHasDrawn: Dispatch<SetStateAction<boolean>>
  setCanvasIsOpen: Dispatch<SetStateAction<boolean>>
  toggleCanvas: () => void
  setFooterText: Dispatch<SetStateAction<PortableTextBlock[]>>
  clearCanvas: () => void
  setClearCanvas: Dispatch<SetStateAction<() => void>>
}

export const CanvasStateContext = createContext<CanvasStateType>({
  hasDrawn: false,
  canvasIsOpen: false,
  footerText: [],
})

export const CanvasActionsContext = createContext<CanvasActionsType>({
  setHasDrawn: () => {},
  setCanvasIsOpen: () => {},
  toggleCanvas: () => {},
  setFooterText: () => {},
  clearCanvas: () => {},
  setClearCanvas: () => {},
})

export function AppWrapper({ children }: { children: ReactNode }) {
  const [hasDrawn, setHasDrawn] = useState<boolean>(false)
  const [canvasIsOpen, setCanvasIsOpen] = useState<boolean>(false)
  const [footerText, setFooterText] = useState<PortableTextBlock[]>([])
  const [clearCanvas, setClearCanvas] = useState<() => void>(() => () => {})

  const toggleCanvas = useCallback(() => {
    setCanvasIsOpen((prevState) => !prevState)
  }, [])

  const state = useMemo(
    () => ({ hasDrawn, canvasIsOpen, footerText }),
    [hasDrawn, canvasIsOpen, footerText]
  )
  const actions = useMemo(
    () => ({
      setHasDrawn,
      setCanvasIsOpen,
      toggleCanvas,
      setFooterText,
      clearCanvas,
      setClearCanvas,
    }),
    [setHasDrawn, setCanvasIsOpen, toggleCanvas, setFooterText, clearCanvas, setClearCanvas]
  )

  useEffect(() => {
    console.log('Canvas is open:', canvasIsOpen)
  }),
    [canvasIsOpen]

  return (
    <CanvasStateContext.Provider value={state}>
      <CanvasActionsContext.Provider value={actions}>{children}</CanvasActionsContext.Provider>
    </CanvasStateContext.Provider>
  )
}

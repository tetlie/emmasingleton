'use client'

import {
  createContext,
  useState,
  useCallback,
  useMemo,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react'
import { PortableTextBlock } from 'sanity'

export type CanvasStateType = {
  hasDrawn: boolean
  canvasIsOpen: boolean
  descriptionIsOpen: boolean
  footerText: string
  projectDescription: PortableTextBlock[]
}

export type CanvasActionsType = {
  setHasDrawn: Dispatch<SetStateAction<boolean>>
  setCanvasIsOpen: Dispatch<SetStateAction<boolean>>
  toggleCanvas: () => void
  setFooterText: Dispatch<SetStateAction<string>>
  setDescriptionIsOpen: Dispatch<SetStateAction<boolean>>
  setProjectDescription: Dispatch<SetStateAction<PortableTextBlock[]>>
  clearCanvas: () => void
  setClearCanvas: Dispatch<SetStateAction<() => void>>
}

export const CanvasStateContext = createContext<CanvasStateType>({
  hasDrawn: false,
  canvasIsOpen: false,
  descriptionIsOpen: false,
  footerText: 'Loading...',
  projectDescription: [],
})

export const CanvasActionsContext = createContext<CanvasActionsType>({
  setHasDrawn: () => {},
  setCanvasIsOpen: () => {},
  setDescriptionIsOpen: () => {},
  toggleCanvas: () => {},
  setFooterText: () => {},
  setProjectDescription: () => {},
  clearCanvas: () => {},
  setClearCanvas: () => {},
})

export function AppWrapper({ children }: { children: ReactNode }) {
  const [hasDrawn, setHasDrawn] = useState<boolean>(false)
  const [canvasIsOpen, setCanvasIsOpen] = useState<boolean>(false)
  const [descriptionIsOpen, setDescriptionIsOpen] = useState<boolean>(false)
  const [footerText, setFooterText] = useState<string>('Loading...')
  const [projectDescription, setProjectDescription] = useState<PortableTextBlock[]>([])
  const [clearCanvas, setClearCanvas] = useState<() => void>(() => () => {})

  const toggleCanvas = useCallback(() => {
    setCanvasIsOpen((prevState) => !prevState)
    setDescriptionIsOpen(false)
  }, [])

  const state = useMemo(
    () => ({ hasDrawn, canvasIsOpen, descriptionIsOpen, footerText, projectDescription }),
    [hasDrawn, canvasIsOpen, descriptionIsOpen, footerText, projectDescription]
  )
  const actions = useMemo(
    () => ({
      setHasDrawn,
      setCanvasIsOpen,
      setDescriptionIsOpen,
      toggleCanvas,
      setFooterText,
      setProjectDescription,
      clearCanvas,
      setClearCanvas,
    }),
    [
      setHasDrawn,
      setCanvasIsOpen,
      setDescriptionIsOpen,
      toggleCanvas,
      setFooterText,
      setProjectDescription,
      clearCanvas,
      setClearCanvas,
    ]
  )

  return (
    <CanvasStateContext.Provider value={state}>
      <CanvasActionsContext.Provider value={actions}>{children}</CanvasActionsContext.Provider>
    </CanvasStateContext.Provider>
  )
}

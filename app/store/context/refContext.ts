import * as React from 'react'

export const FocusTrapRefContext =
  React.createContext<React.RefObject<HTMLButtonElement> | null>(null)

FocusTrapRefContext.displayName = 'Focus Trap Ref Context'

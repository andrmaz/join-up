import * as React from 'react'
import {ModalContextType} from 'app/types/modal'

export const ModalContext = React.createContext<ModalContextType | undefined>(
  undefined
)

ModalContext.displayName = 'Modal Context'

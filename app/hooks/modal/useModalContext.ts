import * as React from 'react'

import {ModalContext} from '@context/modalContext'
import {ModalContextType} from 'app/types/modal'

export default function useModalContext(): ModalContextType {
  const context = React.useContext(ModalContext)
  if (!context) {
    throw new Error(
      'useModalContext must be used within a ModalContext Provider'
    )
  }
  return context
}

import * as React from 'react'
import {FocusTrapRefContext} from '@context/refContext'

export default function useFocusTrapRefContext(): React.RefObject<HTMLButtonElement> | null {
  const context = React.useContext(FocusTrapRefContext)
  if (context === undefined) {
    throw new Error(
      'useFocusTrapRefContext must be used within a FocusTrapRefProvider'
    )
  }
  return context
}

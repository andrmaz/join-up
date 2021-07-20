import * as React from 'react'
import {FocusTrapRefContext} from '@context/refContext'

export const FocusTrapRefProvider = (
  props: React.PropsWithChildren<Record<string, unknown>>
): JSX.Element => {
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLButtonElement>(null)
  return <FocusTrapRefContext.Provider value={focusTrapRef} {...props} />
}

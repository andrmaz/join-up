import * as React from 'react'
import {ModalContext} from '@context/modalContext'

export const ModalProvider = (
  props: React.PropsWithChildren<Record<string, unknown>>
): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const value = {isOpen, setIsOpen}
  return <ModalContext.Provider value={value} {...props} />
}

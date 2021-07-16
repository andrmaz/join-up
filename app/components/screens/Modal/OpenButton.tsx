import * as React from 'react'
import useModalContext from '@hooks/modal/useModalContext'

export default function ModalOpenButton({
  children: child,
}: {
  children: React.ReactElement
}): JSX.Element {
  const {setIsOpen} = useModalContext()
  const onClick = (): void => setIsOpen(true)
  return <React.Fragment>{React.cloneElement(child, {onClick})}</React.Fragment>
}

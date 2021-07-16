import * as React from 'react'

import useModalContext from '@hooks/modal/useModalContext'
import Portal from '@components/screen/Portal/Portal'
import {Dialog} from '@components/screen/Modal/Dialog'

export default function ModalContentsBase(
  props: React.PropsWithChildren<Record<string, unknown>>
): JSX.Element {
  const {isOpen} = useModalContext()
  return (
    <React.Fragment>
      {isOpen ? (
        <Portal>
          <Dialog {...props} />
        </Portal>
      ) : null}
    </React.Fragment>
  )
}

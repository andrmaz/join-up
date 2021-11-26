import * as React from 'react'

import type {ChildrenPropsType} from 'app/types/modal'
import {Dialog} from '@lib/Modal/Dialog'
import Portal from '@lib/Portal/Portal'
import useModalContext from '@hooks/modal/useModalContext'

export default function ModalContentsBase(
  props: ChildrenPropsType
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

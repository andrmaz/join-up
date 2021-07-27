import * as React from 'react'

import useModalContext from '@hooks/modal/useModalContext'
import Portal from '@components/lib/Portal/Portal'
import {Dialog} from '@components/lib/Modal/Dialog'

import type {ChildrenPropsType} from 'app/types/modal'

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

import * as React from 'react'

import {ModalProvider} from '@providers/ModalProvider'
import ModalOpenButton from '@components/screens/Modal/OpenButton'
import ModalContents from '@components/screens/Modal/Contents'

import CreatePositionForm from '@components/form/Form/position/Create'

const NewPosition = (): JSX.Element => {
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  return (
    <ModalProvider>
      <ModalOpenButton>
        <button tabIndex={0}>Add a new position</button>
      </ModalOpenButton>
      <ModalContents
        title='New position'
        focusTrapRef={focusTrapRef}
        aria-label='New position'
      >
        <CreatePositionForm onKeyDown={() => focusTrapRef.current?.focus()} />
      </ModalContents>
    </ModalProvider>
  )
}

export default NewPosition

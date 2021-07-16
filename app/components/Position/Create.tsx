import * as React from 'react'

import {ModalProvider} from '@providers/ModalProvider'
import ModalOpenButton from '@components/lib/Modal/OpenButton'
import ModalContents from '@components/lib/Modal/Contents'

import CreatePositionForm from '@components/Form/position/helpers/Create'

const CreatePosition = (): JSX.Element => {
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

export default CreatePosition

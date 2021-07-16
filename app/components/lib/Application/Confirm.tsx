import * as React from 'react'

import {ModalProvider} from '@providers/ModalProvider'
import ModalOpenButton from '@components/screen/Modal/OpenButton'
import ModalContents from '@components/screen/Modal/Contents'
import {ApplicationForm} from '@components/form/Form/application/Form'

const ConfirmApplication = ({
  uid,
  message,
}: {
  uid: number
  message: string
}): JSX.Element => {
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  return (
    <ModalProvider>
      <ModalOpenButton>
        <button>Apply</button>
      </ModalOpenButton>
      <ModalContents
        title='Apply position'
        focusTrapRef={focusTrapRef}
        aria-label='Apply position'
      >
        <ApplicationForm
          uid={uid}
          message={message}
          onKeyDown={() => focusTrapRef.current?.focus()}
        />
      </ModalContents>
    </ModalProvider>
  )
}

export default ConfirmApplication

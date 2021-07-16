import * as React from 'react'

import {ModalProvider} from '@providers/ModalProvider'
import ModalOpenButton from '@components/lib/Modal/OpenButton'
import ModalContents from '@components/lib/Modal/Contents'
import {ApplicationForm} from '@components/Form/application/Form'

const ConfirmApplication = ({uid}: {uid: number}): JSX.Element => {
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
          onKeyDown={() => focusTrapRef.current?.focus()}
        />
      </ModalContents>
    </ModalProvider>
  )
}

export default ConfirmApplication

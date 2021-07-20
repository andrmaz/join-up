import * as React from 'react'

import {ModalProvider} from '@providers/ModalProvider'
import ModalOpenButton from '@components/lib/Modal/OpenButton'
import ModalContents from '@components/lib/Modal/Contents'
import {ApplicationForm} from '@components/Form/application/Form'

const ConfirmApplication = ({id}: {id: number}): JSX.Element => (
  <ModalProvider>
    <ModalOpenButton>
      <button>Apply</button>
    </ModalOpenButton>
    <ModalContents title='Apply position' aria-label='Apply position'>
      <ApplicationForm id={id} />
    </ModalContents>
  </ModalProvider>
)

export default ConfirmApplication

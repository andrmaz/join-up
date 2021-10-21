import * as React from 'react'

import {CreateApplicationForm} from '@containers/create/Application'
import ModalContents from '@components/lib/Modal/Contents'
import {ModalProvider} from '@providers/ModalProvider'
import {OpenButton} from '@components/lib/Modal/OpenButton'

const ConfirmApplication = ({id}: {id: number}): JSX.Element => (
  <ModalProvider>
    <OpenButton>Apply</OpenButton>
    <ModalContents title='Apply position' aria-label='Apply position'>
      <CreateApplicationForm id={id} />
    </ModalContents>
  </ModalProvider>
)

export default ConfirmApplication

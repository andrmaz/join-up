import * as React from 'react'

import CreatePositionForm from '@containers/create/Position'
import ModalContents from '@lib/Modal/Contents'
import {ModalProvider} from '@providers/ModalProvider'
import {OpenButton} from '@lib/Modal/OpenButton'

const CreatePosition = ({id}: {id: number}): JSX.Element => (
  <ModalProvider>
    <OpenButton>Add a new position</OpenButton>
    <ModalContents title='New position' aria-label='New position'>
      <CreatePositionForm id={id} />
    </ModalContents>
  </ModalProvider>
)

export default CreatePosition

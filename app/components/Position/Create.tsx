import * as React from 'react'

import {ModalProvider} from '@providers/ModalProvider'
import {OpenButton} from '@components/lib/Modal/OpenButton'
import ModalContents from '@components/lib/Modal/Contents'

import CreatePositionForm from '@components/Form/position/helpers/Create'

const CreatePosition = ({id}: {id: number}): JSX.Element => (
  <ModalProvider>
    <OpenButton>Add a new position</OpenButton>
    <ModalContents title='New position' aria-label='New position'>
      <CreatePositionForm id={id} />
    </ModalContents>
  </ModalProvider>
)

export default CreatePosition

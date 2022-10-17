import * as React from 'react'

import {EditPositionForm} from '@containers/edit/Position'
import {FiEdit2} from 'react-icons/fi'
import type {IPositionData} from 'app/types/position'
import ModalContents from '@lib/Modal/Contents'
import {ModalOpenButton} from '@lib/Modal/OpenButton'
import {ModalProvider} from '@providers/ModalProvider'

const EditPosition = ({
  position,
}: {
  position: IPositionData
}): React.ReactElement => (
  <ModalProvider>
    <ModalOpenButton>
      <FiEdit2
        tabIndex={0}
        className='cursor-pointer focus:ring-2 focus:ring-yellow-600'
      />
    </ModalOpenButton>
    <ModalContents title='Edit position' aria-label='Edit position'>
      <EditPositionForm position={position} />
    </ModalContents>
  </ModalProvider>
)

export default EditPosition

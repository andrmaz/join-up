import * as React from 'react'

import ModalContents from '@components/lib/Modal/Contents'
import {ModalOpenButton} from '@components/lib/Modal/OpenButton'
import {ModalProvider} from '@providers/ModalProvider'
import RemoveProjectForm from '@containers/remove/Project'
import {RiDeleteBin6Line} from 'react-icons/ri'

const RemoveProject = ({id}: {id: number}): JSX.Element => (
  <ModalProvider>
    <ModalOpenButton>
      <RiDeleteBin6Line
        tabIndex={0}
        className='cursor-pointer focus:ring-2 focus:ring-yellow-600'
      />
    </ModalOpenButton>
    <ModalContents title='Edit position' aria-label='Edit position'>
      <RemoveProjectForm id={id} />
    </ModalContents>
  </ModalProvider>
)

export default RemoveProject

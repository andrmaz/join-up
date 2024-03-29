import * as React from 'react'

import EditProjectForm from '@containers/edit/Project'
import {FiEdit2} from 'react-icons/fi'
import type {IProjectData} from 'app/types/project'
import ModalContents from '@lib/Modal/Contents'
import {ModalOpenButton} from '@lib/Modal/OpenButton'
import {ModalProvider} from '@providers/ModalProvider'

const EditProject = ({
  project,
}: {
  project: IProjectData
}): React.ReactElement => (
  <ModalProvider>
    <ModalOpenButton>
      <FiEdit2
        tabIndex={0}
        className='cursor-pointer focus:ring-2 focus:ring-yellow-600'
      />
    </ModalOpenButton>
    <ModalContents title='Edit project' aria-label='Edit project'>
      <EditProjectForm project={project} />
    </ModalContents>
  </ModalProvider>
)

export default EditProject

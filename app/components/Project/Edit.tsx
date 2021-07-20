import * as React from 'react'

import {ModalProvider} from '@providers/ModalProvider'
import {ModalOpenButton} from '@components/lib/Modal/OpenButton'
import ModalContents from '@components/lib/Modal/Contents'

import EditProjectForm from '@components/Form/project/helpers/Edit'
import {FiEdit2} from 'react-icons/fi'

import type {IProjectData} from 'app/types/project'

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

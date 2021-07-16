import * as React from 'react'

import {ModalProvider} from '@providers/ModalProvider'
import ModalOpenButton from '@components/screen/Modal/OpenButton'
import ModalContents from '@components/screen/Modal/Contents'

import EditProjectForm from '@components/form/Form/project/helpers/Edit'
import {FiEdit2} from 'react-icons/fi'

import type {IProjectData} from 'app/types/project'

const EditProject = ({
  project,
}: {
  project: IProjectData
}): React.ReactElement => {
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  return (
    <ModalProvider>
      <ModalOpenButton>
        <FiEdit2
          tabIndex={0}
          className='cursor-pointer focus:ring-2 focus:ring-yellow-600'
        />
      </ModalOpenButton>
      <ModalContents
        title='Edit project'
        focusTrapRef={focusTrapRef}
        aria-label='Edit project'
      >
        <EditProjectForm
          onKeyDown={() => focusTrapRef.current?.focus()}
          project={project}
        />
      </ModalContents>
    </ModalProvider>
  )
}

export default EditProject

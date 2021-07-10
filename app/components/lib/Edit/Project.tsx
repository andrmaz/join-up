import * as React from 'react'

import {useForm} from 'react-hook-form'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useRefCallback from '@hooks/ref/useRefCallback'
import useEditProject from '@hooks/edit/useEditProject'

import Modal from '@components/containers/Modal/Modal'
import ProjectForm from '@components/form/Form/Project'
import CloseModalButton from '@components/form/Button/Close'

import type {IProjectData, EditProjectType} from 'app/types/project'

const EditProject = ({
  showModal,
  setShowModal,
  project: {id, name, description, mission, technologies, projectURL},
}: EditProjectType): React.ReactElement => {
  const token = useSessionCookie()
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  const {register, handleSubmit, errors, control, setValue, reset} =
    useForm<IProjectData>()
  const onSubmit = useEditProject(token, id, setShowModal)
  return (
    <React.Fragment>
      {showModal && (
        <Modal height='3/4'>
          <header className='h-16 flex justify-between'>
            <h2
              id='dialog_label'
              tabIndex={-1}
              ref={setRef}
              className='focus:ring-2 focus:ring-yellow-600 h-1/2 text-2xl'
            >
              Edit your project data here
            </h2>
            <CloseModalButton
              onClickAction={() => setShowModal(false)}
              focusRef={focusTrapRef}
            />
          </header>
          <ProjectForm
            handleSubmit={handleSubmit}
            onSubmit={onSubmit}
            register={register}
            errors={errors}
            control={control}
            setValue={setValue}
            reset={reset}
            onKeyDown={() => focusTrapRef.current?.focus()}
            defaultValues={{
              name,
              description,
              mission,
              technologies,
              projectURL,
            }}
          />
        </Modal>
      )}
    </React.Fragment>
  )
}

export default EditProject

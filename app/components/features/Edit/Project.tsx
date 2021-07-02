import * as React from 'react'

import {useForm} from 'react-hook-form'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useRefCallback from '@hooks/ref/useRefCallback'
import useFetchTechnologiesWithToken from '@hooks/fetch/useFetchTechnologiesWithToken'
import useEditProject from '@hooks/edit/useEditProject'

import Modal from '@components/containers/Modal/Modal'
import CloseModalButton from '@components/form/Button/Close'
import FormInput from '@components/form/Input/Form'
import TechSelect from '@components/form/Select/Tech'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IProjectData, EditProjectType} from 'app/types/project'

const EditProject = ({
  showModal,
  setShowModal,
  project: {id, name, description, technologies, collaborators, projectURL},
}: EditProjectType): React.ReactElement => {
  const token = useSessionCookie()
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  //* Set technologies options to State as soon as the modal is shown
  const options = useFetchTechnologiesWithToken(token)
  const {register, handleSubmit, errors, control, setValue, reset} =
    useForm<IProjectData>()
  const onSubmit = useEditProject(token, id, setShowModal)
  const handleCancel = (): void => {
    reset()
    setShowModal(false)
  }
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
          <form
            onSubmit={handleSubmit(onSubmit)}
            className='flex flex-col h-5/6 justify-evenly'
          >
            <FormInput
              type='text'
              id='name'
              name='name'
              label='Name'
              placeholder={name}
              defaultValue={name}
              register={register({
                required: 'project name is required',
                minLength: {
                  value: 3,
                  message: 'please provide a longer name',
                },
                maxLength: 255,
              })}
              errors={errors}
            />
            <FormInput
              type='text'
              id='description'
              name='description'
              label='Description'
              placeholder={description}
              defaultValue={description}
              register={register({
                required: 'project description is required',
                minLength: {
                  value: 10,
                  message: 'please provide a longer description',
                },
                maxLength: 65535,
              })}
              errors={errors}
            />
            <div className='h-1/6 flex flex-col mb-6'>
              <TechSelect
                options={options}
                control={control}
                defaultValues={technologies}
                defaultValue={technologies}
                setValue={setValue}
                errors={errors}
              />
            </div>
            {collaborators.length
              ? 'Collaborators (temporary)'
              : 'No collaboratos (temporary)'}
            <FormInput
              type='url'
              id='projectURL'
              name='projectURL'
              label='Url'
              placeholder={
                projectURL || 'Connect this project to an existing one'
              }
              defaultValue={projectURL}
              register={register({
                pattern: {
                  value:
                    /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
                  message: 'Please enter a valid URL',
                },
              })}
              errors={errors}
              optional
            />
            <div className='h-1/6 flex items-end'>
              <div className='w-16 p-1'>
                <SubmitButton
                  value='Save'
                  bgColor='green-600'
                  errors={Boolean(
                    errors.name || errors.description || errors.technologies
                  )}
                />
              </div>
              <CancelButton
                onClickAction={handleCancel}
                onKeyDownAction={() => focusTrapRef.current?.focus()}
              />
            </div>
          </form>
        </Modal>
      )}
    </React.Fragment>
  )
}

export default EditProject

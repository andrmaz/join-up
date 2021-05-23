import * as React from 'react'
import axios from 'axios'

import {useForm} from 'react-hook-form'
import {useCookies} from 'react-cookie'
import useRefCallback from '@hooks/ref/useRefCallback'

import Portal from '@components/containers/Portal/Portal'
import CloseModalButton from '@components/form/Button/Close'
import FormInput from '@components/form/Input/Form'
import TechSelect from '@components/form/Select/Tech'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {SelectOptions} from 'app/types/form'
import {IProjectData} from 'app/types/project'

const ProjectModal = ({
  showModal,
  setShowModal,
  project: {id, name, description, technologies, collaborators, projectURL},
}: {
  showModal: boolean
  setShowModal: (state: boolean) => void
  project: IProjectData
}): React.ReactElement => {
  //* Get user token from session cookie
  const [cookies] = useCookies(['session'])
  const {session: token} = cookies
  const [options, setOptions] = React.useState<SelectOptions[] | undefined>()
  //* Set technologies options to State as soon as the modal is shown
  React.useEffect(() => {
    //* You now have access to `window`
    ;(async () => {
      const {
        data: {technologies},
      } = await axios.get('/technology')
      setOptions(technologies)
    })()
  }, [])
  const {
    register,
    handleSubmit,
    errors,
    control,
    setValue,
    reset,
  } = useForm<IProjectData>()
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  const handleCancel = (): void => {
    reset()
    setShowModal(false)
  }
  const onSubmit = async (data: IProjectData): Promise<any> => {
    console.dir(data)
    try {
      const response = await axios.patch(
        `/project/${id}`,
        {
          project: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        console.info(response.data.message)
        setShowModal(false)
        return response
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return (
    <React.Fragment>
      {showModal && (
        <Portal>
          <section
            id='dialog_layer'
            className='fixed top-0 left-0 h-screen w-screen bg-gray-500 bg-opacity-50 z-50'
          >
            <article
              id='dialog'
              role='dialog'
              aria-label='dialog'
              aria-labelledby='dialog_label'
              aria-modal={true}
              aria-describedby='dialog_label'
              className='fixed h-3/4 w-1/2 top-32 right-1/4 bg-white border-black border-2 rounded p-4'
            >
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
                    options={options!}
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
                      value: /(https?:\/\/)?([\w-])+\.{1}([a-zA-Z]{2,63})([/\w-]*)*\/?\??([^#\n\r]*)?#?([^\n\r]*)/,
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
            </article>
          </section>
        </Portal>
      )}
    </React.Fragment>
  )
}

export default ProjectModal

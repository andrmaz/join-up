import * as React from 'react'
import {useRouter} from 'next/router'

import {useForm} from 'react-hook-form'
import {useCookies} from 'react-cookie'
import axios from 'axios'

import Portal from '@components/Portal/Portal'
import {SubmitButton} from '@components/Button/Submit'
import CancelButton from '@components/Button/Cancel'
import FormInput from '@components/Input/Form'
import TechSelect from '@components/Select/Tech'
import NumberInput from '@components/Input/Number'
import DefaultSelect from '@components/Select/Default'

import useRefCallback from '@hooks/ref/useRefCallback'

import type {SelectOptions} from 'app/types/form'
import type {IPositionInput} from 'app/types/position'

const PositionModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: (state: boolean) => void
}): JSX.Element => {
  const [options, setOptions] = React.useState<SelectOptions[] | undefined>()
  //* Get user token from session cookie
  const [cookies] = useCookies(['session'])
  const {session: token} = cookies
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    errors,
  } = useForm<IPositionInput>({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {},
    resolver: undefined,
    context: undefined,
    criteriaMode: 'firstError',
    shouldFocusError: true,
    shouldUnregister: true,
  })
  //* Trap focus inside modal dialog
  const focusTrapRef = React.useRef<HTMLElement | null>(null)
  //* Set technologies options to State as soon as the modal is shown
  React.useEffect(() => {
    ;(async () => {
      const {
        data: {technologies},
      } = await axios.get('/technology')
      setOptions(technologies)
    })()
  }, [])
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  //* Reset the entire form state and close the modal
  const handleCancel = (): void => {
    reset()
    setShowModal(false)
  }
  const router = useRouter()
  const onSubmit = async (data: IPositionInput): Promise<any> => {
    data.projectId = window.location.pathname.slice(10)
    try {
      const response = await axios.post(
        '/position',
        {
          position: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      router.push('/profile')
      return response
    } catch (error) {
      Promise.reject(error)
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
              className='fixed h-4/5 w-1/2 top-32 right-1/4 bg-white border-black border-2 rounded p-4'
            >
              <div className='h-1/10'>
                <h2
                  id='dialog_label'
                  tabIndex={-1}
                  ref={setRef}
                  className='focus:ring-2 focus:ring-yellow-600 h-1/2 text-2xl'
                >
                  Add a new position
                </h2>
              </div>
              <form className='h-18/20' onSubmit={handleSubmit(onSubmit)}>
                <div className='h-18/20 flex flex-col justify-evenly pb-6'>
                  <NumberInput
                    id='vacancy-select'
                    name='vacancies'
                    label='Vacancy'
                    register={register}
                    focusRef={focusTrapRef}
                  />
                  <FormInput
                    id='title'
                    name='title'
                    label='Title'
                    type='text'
                    placeholder='Give it a meaningful title'
                    register={register({
                      required: {
                        value: true,
                        message: 'Please enter a title',
                      },
                    })}
                    errors={errors}
                  />
                  <FormInput
                    id='description'
                    name='description'
                    label='Description'
                    type='text'
                    placeholder='Provide a short description'
                    register={register({
                      required: {
                        value: true,
                        message: 'Please provide a description',
                      },
                    })}
                    errors={errors}
                  />
                  <DefaultSelect
                    id='level-select'
                    name='level'
                    control={control}
                    setValue={setValue}
                    errors={errors}
                  />
                  <DefaultSelect
                    id='role-select'
                    name='role'
                    control={control}
                    setValue={setValue}
                    errors={errors}
                  />
                  <TechSelect
                    options={options!}
                    control={control}
                    setValue={setValue}
                    errors={errors}
                  />
                </div>
                <div className='h-1/10 flex'>
                  <SubmitButton
                    value='Add'
                    errors={Boolean(
                      errors.title ||
                        errors.description ||
                        errors.level ||
                        errors.role ||
                        errors.technologies
                    )}
                  />
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

export default PositionModal

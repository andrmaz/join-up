import * as React from 'react'
import {useForm} from 'react-hook-form'
import {useCookies} from 'react-cookie'
import useRefCallback from '@hooks/ref/useRefCallback'

import axios from 'axios'

import Modal from '@components/containers/Modal/Modal'
import FormInput from '@components/form/Input/Form'
import TechSelect from '@components/form/Select/Tech'
import NumberInput from '@components/form/Input/Number'
import DefaultSelect from '@components/form/Select/Default'

// buttons
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'
import CloseModalButton from '@components/form/Button/Close'

import type {SelectOptions} from 'app/types/form'
import type {
  IPosistionData,
  IPositionInput,
  PositionActions,
} from 'app/types/position'

const EditPosition = ({
  position: {
    id,
    title,
    description,
    technologies,
    level,
    role,
    vacancies,
    projectId,
  },
  showModal,
  setShowModal,
  dispatch,
}: {
  position: IPosistionData
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<typeof showModal>>
  dispatch: React.Dispatch<PositionActions>
}): React.ReactElement => {
  const [options, setOptions] = React.useState<SelectOptions[] | undefined>()
  //* Get user token from session cookie
  const [cookies] = useCookies(['session'])
  const {session: token} = cookies
  const {register, handleSubmit, control, setValue, reset, errors} =
    useForm<IPositionInput>({
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
  //* ref will be a callback function instead of a Ref Object
  const [setRef] = useRefCallback()
  //* Reset the entire form state and close the modal
  const handleCancel = (): void => {
    reset()
    setShowModal(false)
  }
  //* Store project id in useRef Hook
  const uid = React.useRef<string | null>(null)
  //* Set technologies options to State as soon as the modal is shown
  React.useEffect(() => {
    //* You now have access to `window`
    uid.current = window.location.pathname.slice(10)
    ;(async () => {
      const {
        data: {technologies},
      } = await axios.get(`/technology/project/${uid.current}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setOptions(technologies)
    })()
    return () => {
      uid.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const onSubmit = async (data: IPosistionData): Promise<unknown> => {
    try {
      data.projectId = projectId
      const response = await axios.patch(
        `/position/${id}`,
        {
          position: data,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      if (response.status === 200) {
        dispatch({type: 'edit', payload: response.data.position})
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
        <Modal height='3/4'>
          <header className='h-16 flex justify-between'>
            <h2
              id='dialog_label'
              tabIndex={-1}
              ref={setRef}
              className='focus:ring-2 focus:ring-yellow-600 h-1/2 text-2xl'
            >
              Edit your position data here
            </h2>
            <CloseModalButton
              onClickAction={() => setShowModal(false)}
              focusRef={focusTrapRef}
            />
          </header>
          <form className='h-18/20' onSubmit={handleSubmit(onSubmit)}>
            <div className='h-18/20 flex flex-col justify-evenly pb-6'>
              <NumberInput
                id='vacancy-select'
                name='vacancies'
                label='Vacancy'
                defaultValue={vacancies}
                register={register}
              />
              <FormInput
                id='title'
                name='title'
                label='Title'
                type='text'
                placeholder={title}
                defaultValue={title}
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
                placeholder={description}
                defaultValue={description}
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
                defaultValue={level}
                setValue={setValue}
                errors={errors}
              />
              <DefaultSelect
                id='role-select'
                name='role'
                control={control}
                defaultValue={role}
                setValue={setValue}
                errors={errors}
              />
              <TechSelect
                options={options!}
                control={control}
                defaultValue={technologies}
                defaultValues={technologies}
                setValue={setValue}
                errors={errors}
              />
            </div>
            <div className='h-1/10 flex'>
              <div className='w-16 p-1'>
                <SubmitButton
                  value='Edit'
                  bgColor='green-600'
                  errors={Boolean(
                    errors.title ||
                      errors.description ||
                      errors.level ||
                      errors.role ||
                      errors.technologies
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

export default EditPosition

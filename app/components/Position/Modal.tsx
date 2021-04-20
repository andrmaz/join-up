import * as React from 'react'
import {useForm} from 'react-hook-form'
import axios from 'axios'

import Portal from '@components/Portal/Portal'
import {ConfirmButton} from '@components/Button/Confirm'
import CancelButton from '@components/Button/Cancel'
import FormInput from '@components/Input/Form'
import TechSelect from '@components/Select/Tech'
import NumberInput from '@components/Input/Number'
import DefaultSelect from '@components/Select/Default'

import useRefCallback from '@hooks/ref/useRefCallback'

import type {SelectOptions} from 'app/types/form'
import type {IPositionInput} from 'app/types/position'

import {Roles} from '@data/roles'
import {Levels} from '@data/levels'

const PositionModal = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean
  setShowModal: (state: boolean) => void
}): JSX.Element => {
  const [options, setOptions] = React.useState<SelectOptions[] | undefined>()
  const {
    register,
    handleSubmit,
    control,
    setValue,
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
  React.useEffect(() => {
    ;(async () => {
      const {
        data: {technologies},
      } = await axios.get('/technology')
      setOptions(technologies)
    })()
  }, [])
  //* ref will be a callback function instead of a Ref Object
  const [ref] = useRefCallback()
  const handleCancel = (e: React.MouseEvent<HTMLButtonElement>): void => {
    e.preventDefault()
    setShowModal(false)
  }
  const onSubmit = (data: IPositionInput): void => console.log(data)
  return (
    <>
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
              className='fixed h-3/4 xl:h-4/6 w-1/2 top-40 xl:top-1/4 right-1/4 bg-white border-black border-2 rounded p-4'
            >
              <div className='h-1/10'>
                <h2
                  id='dialog_label'
                  tabIndex={-1}
                  ref={ref}
                  className='focus:border-yellow-600 h-1/2 text-2xl'
                >
                  Add a new position
                </h2>
              </div>
              <form className='h-18/20' onSubmit={handleSubmit(onSubmit)}>
                <div className='h-18/20 flex flex-col justify-evenly pb-6'>
                  <FormInput
                    id='title'
                    name='title'
                    label='Title'
                    type='text'
                    placeholder=''
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
                    placeholder=''
                    register={register({
                      required: {
                        value: true,
                        message: 'Please provide a description',
                      },
                    })}
                    errors={errors}
                  />
                  <TechSelect
                    options={options!}
                    control={control}
                    setValue={setValue}
                    errors={errors}
                  />
                  <NumberInput
                    id='vacancy-select'
                    name='vacancy'
                    label='Vacancy'
                    register={register}
                  />
                  <DefaultSelect
                    id='level-select'
                    name='level'
                    options={Levels}
                    control={control}
                    setValue={setValue}
                  />
                  <DefaultSelect
                    id='role-select'
                    name='role'
                    options={Roles}
                    control={control}
                    setValue={setValue}
                  />
                </div>
                <div className='h-1/10 flex'>
                  <CancelButton action={handleCancel} />
                  <ConfirmButton
                    value='Add'
                    errors={Boolean(
                      errors.title || errors.description || errors.technologies
                    )}
                  />
                </div>
              </form>
            </article>
          </section>
        </Portal>
      )}
    </>
  )
}

export default PositionModal

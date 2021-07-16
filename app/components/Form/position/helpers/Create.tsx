import {useForm} from 'react-hook-form'

import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useModalContext from '@hooks/modal/useModalContext'

import {addPositionWithToken} from '@api/fetchWithToken'
import {usePositionContext} from '@hooks/position/usePositionContext'

import PositionForm from '@components/Form/position/Form'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IPositionInput} from 'app/types/position'
import type {PositionResponseType} from 'app/types/response'

const CreatePositionForm = ({
  onKeyDown,
}: {
  onKeyDown: () => void
}): JSX.Element => {
  const token = useSessionCookie()
  const pathname = window.location.pathname || ''
  const id = pathname.substring(10, pathname.length)
  const {setIsOpen} = useModalContext()
  const {dispatch} = usePositionContext()
  const {register, handleSubmit, control, setValue, reset, errors} =
    useForm<IPositionInput>()
  const onSubmit = (data: IPositionInput): Promise<PositionResponseType> =>
    addPositionWithToken(data, token)
      .then(response => {
        if (response.status === 201) {
          dispatch({type: 'add', payload: response.data.position})
          setIsOpen(false)
          return Promise.resolve(response.data)
        }
        return response.data
      })
      .catch(err => Promise.reject(err))
  return (
    <form className='h-144' onSubmit={handleSubmit(onSubmit)}>
      <PositionForm
        id={parseInt(id)}
        token={token}
        register={register}
        errors={errors}
        control={control}
        setValue={setValue}
      />
      <div className='h-1/10 flex'>
        <div className='w-16 p-1'>
          <SubmitButton
            value='Save'
            bgColor='green-600'
            errors={Boolean(
              errors.title ||
                errors.duties ||
                errors.qualifications ||
                errors.level ||
                errors.role ||
                errors.technologies
            )}
          />
        </div>
        <CancelButton
          onClickHandler={() => reset()}
          onKeyDownHandler={onKeyDown}
        />
      </div>
    </form>
  )
}

export default CreatePositionForm

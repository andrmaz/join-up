import {useForm} from 'react-hook-form'

import useEditPosition from '@hooks/position/useEditPosition'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useModalContext from '@hooks/modal/useModalContext'

import PositionForm from '@components/Form/position/Form'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IPositionInput, IPositionData} from 'app/types/position'

const EditPositionForm = ({
  onKeyDown,
  position,
}: {
  onKeyDown: () => void
  position: IPositionData
}): JSX.Element => {
  const token = useSessionCookie()
  const {setIsOpen} = useModalContext()
  const {register, handleSubmit, control, setValue, reset, errors} =
    useForm<IPositionInput>()
  const onSubmit = useEditPosition(
    token,
    position?.id,
    position?.projectId,
    setIsOpen
  )
  return (
    <form className='h-144' onSubmit={handleSubmit(onSubmit)}>
      <PositionForm
        token={token}
        position={position}
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

export default EditPositionForm

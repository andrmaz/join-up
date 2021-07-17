import {useForm} from 'react-hook-form'
import useSessionCookie from '@hooks/cookie/useSessionCookie'

import TitleInput from '@components/form/Input/lib/Title'
import TextInput from '@components/form/Input/lib/Text'
import VacancyInput from '@components/form/Input/position/Vacancy'

import TechSelect from '@components/form/Select/Tech'
import LevelSelect from '@components/form/Select/Level'
import RoleSelect from '@components/form/Select/Role'
import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IPositionInput} from 'app/types/position'
import type {IPositionForm} from 'app/types/form'

const PositionForm = ({
  id,
  onSubmit,
  position,
  onKeyDown,
}: IPositionForm): JSX.Element => {
  const token = useSessionCookie()
  const {register, handleSubmit, control, setValue, reset, errors} =
    useForm<IPositionInput>()
  return (
    <form className='h-144' onSubmit={handleSubmit(onSubmit)}>
      <div className='h-18/20 flex flex-col justify-evenly pb-6'>
        <VacancyInput defaultValue={position?.vacancies} register={register} />
        <TitleInput
          defaultValue={position?.title}
          register={register}
          errors={errors}
        />
        <TextInput
          id='duties'
          name='duties'
          label='Duties'
          defaultValue={position?.duties}
          register={register}
          errors={errors}
        />
        <TextInput
          id='qualifications'
          name='qualifications'
          label='Qualifications'
          defaultValue={position?.qualifications}
          register={register}
          errors={errors}
        />
        <LevelSelect
          control={control}
          defaultValue={position?.level}
          setValue={setValue}
          errors={errors}
        />
        <RoleSelect
          control={control}
          defaultValue={position?.role}
          setValue={setValue}
          errors={errors}
        />
        <TechSelect
          id={id ? id : position?.projectId}
          token={token}
          control={control}
          defaultValue={position?.technologies}
          defaultValues={position?.technologies}
          setValue={setValue}
          errors={errors}
        />
      </div>
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

export default PositionForm

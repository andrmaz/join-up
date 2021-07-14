import TitleInput from '@components/form/Input/Title'
import TextInput from '@components/form/Input/Text'
import VacancyInput from '@components/form/Input/position/Vacancy'

import TechSelect from '@components/form/Select/Tech'
import LevelSelect from '@components/form/Select/Level'
import RoleSelect from '@components/form/Select/Role'

import {SubmitButton} from '@components/form/Button/Submit'
import CancelButton from '@components/form/Button/Cancel'

import type {IPositionForm} from 'app/types/form'

const PositionForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  control,
  setValue,
  reset,
  onKeyDown,
  defaultValues,
  id,
  token,
}: IPositionForm): JSX.Element => (
  <form className='h-18/20 w-4/5 mx-auto' onSubmit={handleSubmit(onSubmit)}>
    <div className='h-18/20 flex flex-col justify-evenly pb-6'>
      <VacancyInput
        defaultValue={defaultValues?.vacancies}
        register={register}
      />
      <TitleInput
        defaultValue={defaultValues?.title}
        register={register}
        errors={errors}
      />
      <TextInput
        id='duties'
        name='duties'
        label='Duties'
        defaultValue={defaultValues?.duties}
        register={register}
        errors={errors}
      />
      <TextInput
        id='qualifications'
        name='qualifications'
        label='Qualifications'
        defaultValue={defaultValues?.qualifications}
        register={register}
        errors={errors}
      />
      <LevelSelect
        control={control}
        defaultValue={defaultValues?.level}
        setValue={setValue}
        errors={errors}
      />
      <RoleSelect
        control={control}
        defaultValue={defaultValues?.role}
        setValue={setValue}
        errors={errors}
      />
      <TechSelect
        id={id}
        token={token}
        control={control}
        defaultValue={defaultValues?.technologies}
        defaultValues={defaultValues?.technologies}
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

export default PositionForm

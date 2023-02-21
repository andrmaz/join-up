import FocusButton from '@components/Button/Focus'
import type {IPositionForm} from 'app/types/form'
import type {IPositionInput} from 'app/types/position'
import InputSubmit from '@lib/Input/Submit'
import LevelSelect from '@components/Select/Level'
import RoleSelect from '@components/Select/Role'
import TechSelect from '@components/Select/Tech'
import TextInput from '@lib/Input/Text'
import TitleInput from '@lib/Input/Title'
import VacancyInput from '@components/Input/Vacancy'
import {useForm} from 'react-hook-form'
import {titleRegisterOptions} from '@data/register'

const PositionForm = ({id, onSubmit, position}: IPositionForm): JSX.Element => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: {errors},
  } = useForm<IPositionInput>()

  return (
    <form className='h-144' onSubmit={handleSubmit(onSubmit)}>
      <div className='h-18/20 flex flex-col justify-evenly pb-6'>
        <VacancyInput
          id='vacancy-select'
          name='vacancies'
          inputProps={register('vacancies')}
          defaultValue={String(position?.vacancies)}
        />
        <TitleInput
          id='title'
          name='title'
          inputProps={register('title', titleRegisterOptions)}
          defaultValue={position?.title}
          errors={errors}
        />
        <TextInput
          id='duties'
          name='duties'
          label='Duties'
          defaultValue={position?.duties}
          inputProps={register('duties')}
          errors={errors}
        />
        <TextInput
          id='qualifications'
          name='qualifications'
          label='Qualifications'
          defaultValue={position?.qualifications}
          inputProps={register('qualifications')}
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
          id={id}
          control={control}
          defaultValue={position?.technologies}
          defaultValues={position?.technologies}
          setValue={setValue}
          errors={errors}
        />
      </div>
      <div className='h-1/10 flex'>
        <div className='w-16 p-1'>
          <InputSubmit
            value='Save'
            bgColor='green-600'
            disabled={Boolean(
              errors.title ||
                errors.duties ||
                errors.qualifications ||
                errors.level ||
                errors.role ||
                errors.technologies
            )}
          />
        </div>
        <FocusButton onClick={reset} />
      </div>
    </form>
  )
}

export default PositionForm

import TitleInput from '@components/form/Input/lib/Title'
import TextInput from '@components/form/Input/lib/Text'
import VacancyInput from '@components/form/Input/position/Vacancy'

import TechSelect from '@components/form/Select/Tech'
import LevelSelect from '@components/form/Select/Level'
import RoleSelect from '@components/form/Select/Role'

import type {IPositionForm} from 'app/types/form'

const PositionForm = ({
  id,
  token,
  position,
  register,
  errors,
  control,
  setValue,
}: IPositionForm): JSX.Element => (
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
)

export default PositionForm

import TechSelect from '@components/Select/Tech'
import {DateSelect} from '@components/Select/Date'
import {RadioInput} from '@components/Input/Radio'
import {CheckboxInput} from '@components/Input/Checkbox'

import {IDrawerProps} from 'app/types/drawer'

const ProjectDrawer = ({
  register,
  isPending,
  options,
  setValue,
  control,
  technologies,
}: IDrawerProps): JSX.Element => (
  <section className='sticky top-40 w-full h-70v p-2'>
    <form className='flex flex-col h-auto justify-around px-2'>
      <DateSelect register={register} isPending={isPending} />
      {technologies && technologies.length > 1 && (
        <RadioInput register={register} isPending={isPending} />
      )}
      <CheckboxInput register={register} isPending={isPending} />
      <TechSelect
        options={options}
        disabled={Boolean(isPending)}
        control={control}
        setValue={setValue}
      />
    </form>
  </section>
)

export default ProjectDrawer

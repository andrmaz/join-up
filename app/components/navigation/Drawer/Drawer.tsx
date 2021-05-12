import * as React from 'react'
import TechSelect from '@components/form/Select/Tech'
import {DateSelect} from '@components/form/Select/Date'
import {RadioInput} from '@components/form/Input/Radio'
import {CheckboxInput} from '@components/form/Input/Checkbox'

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

export default React.memo(ProjectDrawer, (prevProps, nextProps) => {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  if (prevProps.isPending !== nextProps.isPending) return false
  if (prevProps.options !== nextProps.options) return false
  if (prevProps.setValue !== nextProps.setValue) return false
  if (prevProps.control !== nextProps.control) return false
  if (prevProps.technologies !== nextProps.technologies) return false
  //! Do not include register Prop
  return true
})

import * as React from 'react'
import TechSelect from '@components/form/Select/Tech'
import {DateSelect} from '@components/form/Select/Date'
import {RadioInput} from '@components/form/Input/lib/Radio'
import {CheckboxInput} from '@components/form/Input/lib/Checkbox'

import {IDrawerProps} from 'app/types/navigation'

const Drawer = ({
  register,
  isPending,
  setValue,
  control,
  technologies,
}: IDrawerProps): JSX.Element => (
  <section className='sticky top-40 w-5/6 h-70v p-2'>
    <form className='flex flex-col h-auto max-h-full justify-around px-2'>
      <DateSelect register={register} isPending={isPending} />
      {technologies && technologies.length > 1 && (
        <RadioInput register={register} isPending={isPending} />
      )}
      <CheckboxInput register={register} isPending={isPending} />
      <TechSelect
        disabled={Boolean(isPending)}
        control={control}
        setValue={setValue}
      />
    </form>
  </section>
)

export default React.memo(Drawer, (prevProps, nextProps) => {
  /*
  return true if passing nextProps to render would return
  the same result as passing prevProps to render,
  otherwise return false
  */
  if (prevProps.isPending !== nextProps.isPending) return false
  if (prevProps.setValue !== nextProps.setValue) return false
  if (prevProps.control !== nextProps.control) return false
  if (prevProps.technologies !== nextProps.technologies) return false
  //! Do not include register Prop
  return true
})

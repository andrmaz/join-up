import * as React from 'react'

import CheckboxInput from '@lib/Input/Checkbox'
import DateSelect from '@components/Select/Date'
import {IDrawerProps} from 'app/types/components'
import RadioInput from '@lib/Input/Radio'
import TechSelect from '@components/Select/Tech'

const Drawer = ({
  register,
  isPending,
  setValue,
  control,
  technologies,
}: IDrawerProps): JSX.Element => (
  <section className='drawer-side'>
    <form className='flex flex-col h-auto max-h-full justify-around px-2'>
      <DateSelect inputProps={register('date')} disabled={isPending} />
      {technologies && technologies.length > 1 && (
        <RadioInput inputProps={register('match')} disabled={isPending} />
      )}
      <CheckboxInput inputProps={register('available')} disabled={isPending} />
      <TechSelect disabled={isPending} control={control} setValue={setValue} />
    </form>
  </section>
)

export default Drawer

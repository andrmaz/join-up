import FormSelect from '@components/Form/Select'
import {DateSelect} from '@components/Drawer/DateSelect'
import {MatchRadio} from '@components/Drawer/MatchRadio'
import {JobCheckbox} from '@components/Drawer/JobCheckbox'

import {IDrawerProps} from 'app/types/drawer'

const Drawer = ({
  register,
  isPending,
  options,
  onChange,
  control,
}: IDrawerProps): JSX.Element => (
  <section className='sticky top-40 w-full h-70v p-2'>
    <form className='flex flex-col h-auto justify-around px-2'>
      <DateSelect register={register} isPending={isPending} />
      <MatchRadio register={register} isPending={isPending} />
      <JobCheckbox register={register} isPending={isPending} />
      <FormSelect
        id='technologies'
        label='Technologies'
        options={options}
        placeholder='Choose your tech stack'
        message='Please select at least one technology'
        disabled={Boolean(isPending)}
        control={control}
        onChange={onChange}
      />
    </form>
  </section>
)

export default Drawer

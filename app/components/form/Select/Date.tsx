import {DrawerInputsProps} from 'app/types/drawer'

export const DateSelect = ({
  register,
  isPending,
}: DrawerInputsProps): JSX.Element => (
  <div className='flex flex-col'>
    <label htmlFor='sort-by-date' className='xl:text-2xl'>
      Choose if you want to sort by date
    </label>
    <select
      name='date'
      id='sort-by-date'
      className='border-2 border-gray-200	w-24'
      ref={register}
      disabled={Boolean(isPending)}
    >
      <option value='datedesc' defaultChecked>
        Newest
      </option>
      <option value='dateasc'>Oldest</option>
    </select>
  </div>
)

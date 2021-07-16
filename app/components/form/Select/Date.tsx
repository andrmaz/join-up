import {DrawerInputsType} from 'app/types/components'

export const DateSelect = ({
  register,
  isPending,
}: DrawerInputsType): JSX.Element => (
  <div className='flex flex-col'>
    <label htmlFor='sort-by-date' className='text-xl italic mb-1'>
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

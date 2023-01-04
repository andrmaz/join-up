import {DrawerInputsType} from 'app/types/components'

export const DateSelect = ({
  register,
  isPending,
}: DrawerInputsType): JSX.Element => (
  <div className='flex flex-col'>
    <label htmlFor='sort-by-date' className='mb-1'>
      Sort by date
    </label>
    <select
      name='date'
      id='sort-by-date'
      className='border-2 border-gray-200	w-24'
      ref={register}
      disabled={Boolean(isPending)}
    >
      <option value='desc' defaultChecked>
        Newest
      </option>
      <option value='asc'>Oldest</option>
    </select>
  </div>
)

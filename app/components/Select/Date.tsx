import {DrawerInputsType} from 'app/types/components'

const DateSelect = ({inputProps, disabled}: DrawerInputsType): JSX.Element => (
  <div className='flex flex-col'>
    <label htmlFor='sort-by-date' className='mb-1'>
      Sort by date
    </label>
    <select
      id='sort-by-date'
      className='border-2 border-gray-200	w-24'
      disabled={disabled}
      {...inputProps}
    >
      <option value='desc' defaultChecked>
        Newest
      </option>
      <option value='asc'>Oldest</option>
    </select>
  </div>
)

export default DateSelect

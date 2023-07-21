import {DrawerInputsType} from 'app/types/components'

const DateSelect = ({inputProps, disabled}: DrawerInputsType): JSX.Element => (
  <div className='form-control w-full max-w-xs'>
    <label htmlFor='sort-by-date' className='label'>
      <span className='label-text'>Sort by date</span>
    </label>
    <select
      id='sort-by-date'
      disabled={disabled}
      className='select select-bordered'
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

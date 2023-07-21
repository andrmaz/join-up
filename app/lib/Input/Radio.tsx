import {DrawerInputsType} from 'app/types/components'

const RadioInput = ({inputProps, disabled}: DrawerInputsType): JSX.Element => (
  <div className='mt-4'>
    <p className='mb-1'>Match technologies:</p>
    <div className='flex flex-row'>
      <div className='form-control'>
        <label htmlFor='any' className='label cursor-pointer'>
          <span className='label-text'>Any</span>
          <input
            type='radio'
            id='any'
            value='any'
            defaultChecked
            disabled={disabled}
            className='radio'
            {...inputProps}
          />
        </label>
      </div>
      <div className='form-control'>
        <label htmlFor='all' className='label cursor-pointer'>
          <span className='label-text'>All</span>
          <input
            type='radio'
            id='all'
            value='all'
            disabled={disabled}
            className='radio'
            {...inputProps}
          />
        </label>
      </div>
    </div>
  </div>
)

export default RadioInput

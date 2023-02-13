import {DrawerInputsType} from 'app/types/components'

const RadioInput = ({inputProps, disabled}: DrawerInputsType): JSX.Element => (
  <div className='mt-4'>
    <p className='mb-1'>Match technologies:</p>
    <div className='flex flex-row'>
      <div className='m-1'>
        <input
          type='radio'
          id='any'
          value='any'
          defaultChecked
          disabled={disabled}
          {...inputProps}
        />
        <label htmlFor='any'>Any</label>
      </div>
      <div className='m-1'>
        <input
          type='radio'
          id='all'
          value='all'
          disabled={disabled}
          {...inputProps}
        />
        <label htmlFor='all'>All</label>
      </div>
    </div>
  </div>
)

export default RadioInput

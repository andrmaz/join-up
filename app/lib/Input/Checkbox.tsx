import {DrawerInputsType} from 'app/types/components'

const CheckboxInput = ({
  inputProps,
  disabled,
}: DrawerInputsType): JSX.Element => (
  <div className='my-4'>
    <p className='mb-1'>See available positions:</p>
    <div>
      <input
        type='checkbox'
        id='available'
        disabled={disabled}
        defaultChecked
        {...inputProps}
      />
      <label htmlFor='available'>Available</label>
    </div>
  </div>
)

export default CheckboxInput

import {DrawerInputsType} from 'app/types/components'

const CheckboxInput = ({
  inputProps,
  disabled,
}: DrawerInputsType): JSX.Element => (
  <div className='form-control'>
    <label htmlFor='available' className='label cursor-pointer'>
      <input
        type='checkbox'
        id='available'
        disabled={disabled}
        defaultChecked
        {...inputProps}
      />
      <span className='label-text'>Available</span>
    </label>
  </div>
)

export default CheckboxInput

import type {InputSubmitType} from 'app/types/form'

const InputSubmit = ({
  value = 'Submit',
  disabled = false,
}: InputSubmitType): JSX.Element => (
  <input
    type='submit'
    value={value}
    disabled={disabled}
    className='btn btn-primary'
  />
)

export default InputSubmit

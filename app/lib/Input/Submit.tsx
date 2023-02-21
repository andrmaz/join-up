import type {InputSubmitType} from 'app/types/form'

const InputSubmit = ({
  value = 'Submit',
  disabled = false,
  bgColor = 'blue-800',
}: InputSubmitType): JSX.Element => (
  <input
    type='submit'
    value={value}
    disabled={disabled}
    className={`h-auto w-full py-1 cursor-pointer bg-${bgColor} text-white rounded disabled:opacity-50`}
  />
)

export default InputSubmit

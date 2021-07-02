import type {SubmitButtonType} from 'app/types/form'

export const SubmitButton = ({
  value = 'Submit',
  errors = false,
  bgColor = 'blue-800',
}: SubmitButtonType): JSX.Element => (
  <input
    type='submit'
    value={value}
    disabled={errors}
    className={`h-auto w-full py-1 cursor-pointer bg-${bgColor} text-white rounded disabled:opacity-50`}
  />
)

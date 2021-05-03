import type {FormButton} from 'app/types/form'

export const SubmitButton = ({
  value = 'Submit',
  errors = false,
}: FormButton): JSX.Element => (
  <input
    type='submit'
    value={value}
    disabled={errors}
    className='h-auto w-full py-1 cursor-pointer bg-blue-800 text-white rounded disabled:opacity-50'
  />
)

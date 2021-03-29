export const SubmitButton = ({
  value,
  errors,
}: {
  value: string
  errors: boolean
}): JSX.Element => (
  <input
    type='submit'
    value={value}
    className='w-2/6 h-6 cursor-pointer bg-green-600 text-white rounded m-1 disabled:opacity-50'
    disabled={errors}
  />
)

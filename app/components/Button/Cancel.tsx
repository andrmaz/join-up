const CancelButton = ({
  action,
}: {
  action: (e: React.MouseEvent<HTMLButtonElement>) => void
}): JSX.Element => (
  <button
    type='button'
    className='w-16 h-8 p-1 bg-gray-800 text-white m-1 rounded'
    onClick={action}
  >
    Cancel
  </button>
)

export default CancelButton

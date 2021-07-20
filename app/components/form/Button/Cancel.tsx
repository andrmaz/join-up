const CancelButton = ({onClick}: {onClick: () => void}): JSX.Element => {
  return (
    <button
      type='button'
      className='w-16 h-8 p-1 bg-gray-800 text-white m-1 rounded focus:bg-gray-600'
      onClick={onClick}
    >
      Cancel
    </button>
  )
}

export default CancelButton

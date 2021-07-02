import type {CancelButtonType} from 'app/types/form'

const CancelButton = ({
  onClickAction,
  onKeyDownAction,
}: CancelButtonType): JSX.Element => (
  <button
    type='button'
    className='w-16 h-8 p-1 bg-gray-800 text-white m-1 rounded focus:bg-gray-600'
    onClick={onClickAction}
    onKeyDown={onKeyDownAction}
  >
    Cancel
  </button>
)

export default CancelButton

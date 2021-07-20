import useFocusTrapRefContext from '@hooks/ref/useRefContext'
import type {CancelButtonType} from 'app/types/form'

const FocusRefButton = ({
  onClickHandler: onClickAction,
}: CancelButtonType): JSX.Element => {
  const ref = useFocusTrapRefContext()
  return (
    <button
      type='button'
      className='w-16 h-8 p-1 bg-gray-800 text-white m-1 rounded focus:bg-gray-600'
      onClick={onClickAction}
      onKeyDown={() => ref?.current?.focus()}
    >
      Cancel
    </button>
  )
}

export default FocusRefButton

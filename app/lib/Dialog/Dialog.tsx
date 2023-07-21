import Button from '@lib/Button'
import type {DialogType} from 'app/types/components'
import FocusButton from '@components/Button/Focus'
import useModalContext from '@hooks/modal/useModalContext'

const Dialog = ({handleConfirm, message}: DialogType): JSX.Element => {
  const {setIsOpen} = useModalContext()
  return (
    <dialog id='my_modal_1' className='modal'>
      <form method='dialog' className='modal-box'>
        <span role='article' className='h-1/2'>
          {message}
        </span>
        <div className='modal-action'>
          <Button onClick={handleConfirm} />
          <FocusButton onClick={() => setIsOpen(false)} />
        </div>
      </form>
    </dialog>
  )
}

export default Dialog

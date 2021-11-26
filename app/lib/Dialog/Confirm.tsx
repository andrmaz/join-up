import {ConfirmButton} from '@lib/Button/Confirm'
import type {ConfirmDialogType} from 'app/types/components'
import FocusRefButton from '@lib/Button/FocusRef'
import useModalContext from '@hooks/modal/useModalContext'

const ConfirmDialog = ({
  handleConfirm,
  message,
  btnColor,
}: ConfirmDialogType): JSX.Element => {
  const {setIsOpen} = useModalContext()
  return (
    <main>
      <div className='h-16 w-full'>
        <span role='article' className='h-1/2'>
          {message}
        </span>
      </div>
      <div className='w-full h-1/3 flex'>
        <ConfirmButton onClick={handleConfirm} bgColor={btnColor} />
        <FocusRefButton onClick={() => setIsOpen(false)} />
      </div>
    </main>
  )
}

export {ConfirmDialog}

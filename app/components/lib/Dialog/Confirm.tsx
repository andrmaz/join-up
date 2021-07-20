import useModalContext from '@hooks/modal/useModalContext'

import FocusRefButton from '@components/form/Button/FocusRef'
import {ConfirmButton} from '@components/form/Button/Confirm'

import type {ConfirmDialogType} from 'app/types/components'

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

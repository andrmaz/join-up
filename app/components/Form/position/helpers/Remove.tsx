import * as React from 'react'

import useRemovePosition from '@hooks/position/useRemovePosition'
import useModalContext from '@hooks/modal/useModalContext'

import FocusRefButton from '@components/form/Button/FocusRef'
import {ConfirmButton} from '@components/form/Button/Confirm'

export const RemovePositionForm = ({id}: {id: number}): JSX.Element => {
  const {setIsOpen} = useModalContext()
  const handleConfirm = useRemovePosition(id, setIsOpen)
  return (
    <React.Fragment>
      <div className='h-16 w-full'>
        <span role='article' className='h-1/2'>
          Are you sure you want delete this position?
        </span>
      </div>
      <div className='w-full h-1/3 flex'>
        <ConfirmButton bgColor='red' onClickAction={handleConfirm}>
          Confirm
        </ConfirmButton>
        <FocusRefButton onClickHandler={() => setIsOpen(false)} />
      </div>
    </React.Fragment>
  )
}

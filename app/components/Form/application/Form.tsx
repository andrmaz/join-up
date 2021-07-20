import * as React from 'react'

import useAddApplication from '@hooks/application/useAddApplication'
import useModalContext from '@hooks/modal/useModalContext'

import FocusRefButton from '@components/form/Button/FocusRef'
import {ConfirmButton} from '@components/form/Button/Confirm'

export const ApplicationForm = ({id}: {id: number}): JSX.Element => {
  const {setIsOpen} = useModalContext()
  const handleConfirm = useAddApplication(id)
  return (
    <React.Fragment>
      <div className='h-16 w-full'>
        <span role='article' className='h-1/2'>
          Are you sure you want to apply to this position?
        </span>
      </div>
      <div className='w-full h-1/3 flex'>
        <ConfirmButton onClick={handleConfirm} />
        <FocusRefButton onClick={() => setIsOpen(false)} />
      </div>
    </React.Fragment>
  )
}

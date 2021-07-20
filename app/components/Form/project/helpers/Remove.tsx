import * as React from 'react'

import useRemoveProject from '@hooks/project/useRemoveProject'
import useModalContext from '@hooks/modal/useModalContext'

import FocusRefButton from '@components/form/Button/FocusRef'
import {ConfirmButton} from '@components/form/Button/Confirm'

export const RemoveProjectForm = ({id}: {id: number}): JSX.Element => {
  const {setIsOpen} = useModalContext()
  const handleConfirm = useRemoveProject(id)
  return (
    <React.Fragment>
      <div className='h-16 w-full'>
        <span role='article' className='h-1/2'>
          Are you sure you want delete this project?
        </span>
      </div>
      <div className='w-full h-1/3 flex'>
        <ConfirmButton bgColor='red' onClick={handleConfirm} />
        <FocusRefButton onClick={() => setIsOpen(false)} />
      </div>
    </React.Fragment>
  )
}

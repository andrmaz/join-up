import * as React from 'react'

import useRemoveProject from '@hooks/project/useRemoveProject'
import useModalContext from '@hooks/modal/useModalContext'

import CancelButton from '@components/form/Button/Cancel'
import {ConfirmButton} from '@components/form/Button/Confirm'

export const RemoveProjectForm = ({
  id,
  onKeyDown,
}: {
  id: number
  onKeyDown: () => void
}): JSX.Element => {
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
        <ConfirmButton bgColor='red' onClickAction={handleConfirm}>
          Confirm
        </ConfirmButton>
        <CancelButton
          onClickHandler={() => setIsOpen(false)}
          onKeyDownHandler={onKeyDown}
        />
      </div>
    </React.Fragment>
  )
}

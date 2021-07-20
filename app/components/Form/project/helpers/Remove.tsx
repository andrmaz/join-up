import * as React from 'react'

import useRemoveProject from '@hooks/project/useRemoveProject'
import {ConfirmDialog} from '@components/lib/Dialog/Confirm'

export const RemoveProjectForm = ({id}: {id: number}): JSX.Element => {
  const handleConfirm = useRemoveProject(id)
  return (
    <ConfirmDialog
      handleConfirm={handleConfirm}
      message=' Are you sure you want delete this project?'
      btnColor='red'
    />
  )
}

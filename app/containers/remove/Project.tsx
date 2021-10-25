import * as React from 'react'

import {ConfirmDialog} from '@components/lib/Dialog/Confirm'
import useRemoveProject from '@hooks/project/useRemoveProject'

const RemoveProjectForm = ({id}: {id: number}): JSX.Element => {
  const handleConfirm = useRemoveProject(id)
  return (
    <ConfirmDialog
      handleConfirm={handleConfirm}
      message=' Are you sure you want delete this project?'
      btnColor='red'
    />
  )
}

export default RemoveProjectForm

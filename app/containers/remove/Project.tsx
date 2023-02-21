import * as React from 'react'

import Dialog from '@lib/Dialog'
import useRemoveProject from '@hooks/project/useRemoveProject'

const RemoveProjectForm = ({id}: {id: number}): JSX.Element => {
  const [handleConfirm] = useRemoveProject(id)
  return (
    <Dialog
      handleConfirm={handleConfirm}
      message=' Are you sure you want delete this project?'
      variant='danger'
    />
  )
}

export default RemoveProjectForm

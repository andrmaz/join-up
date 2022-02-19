import * as React from 'react'

import Dialog from '@lib/Dialog'
import useRemovePosition from '@hooks/position/useRemovePosition'

const RemovePositionForm = ({id}: {id: number}): JSX.Element => {
  const handleConfirm = useRemovePosition(id)
  return (
    <Dialog
      handleConfirm={handleConfirm}
      message=' Are you sure you want delete this position?'
      variant='danger'
    />
  )
}

export default RemovePositionForm

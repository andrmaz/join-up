import * as React from 'react'

import {ConfirmDialog} from '@lib/Dialog/Confirm'
import useRemovePosition from '@hooks/position/useRemovePosition'

const RemovePositionForm = ({id}: {id: number}): JSX.Element => {
  const handleConfirm = useRemovePosition(id)
  return (
    <ConfirmDialog
      handleConfirm={handleConfirm}
      message=' Are you sure you want delete this position?'
      btnColor='red'
    />
  )
}

export default RemovePositionForm

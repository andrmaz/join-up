import * as React from 'react'

import useRemovePosition from '@hooks/position/useRemovePosition'
import {ConfirmDialog} from '@components/lib/Dialog/Confirm'

export const RemovePositionForm = ({id}: {id: number}): JSX.Element => {
  const handleConfirm = useRemovePosition(id)
  return (
    <ConfirmDialog
      handleConfirm={handleConfirm}
      message=' Are you sure you want delete this position?'
      btnColor='red'
    />
  )
}

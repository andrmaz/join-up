import * as React from 'react'

import useAddApplication from '@hooks/application/useAddApplication'
import {ConfirmDialog} from '@components/lib/Dialog/Confirm'

export const ConfirmApplicationForm = ({id}: {id: number}): JSX.Element => {
  const handleConfirm = useAddApplication(id)
  return (
    <ConfirmDialog
      handleConfirm={handleConfirm}
      message='Are you sure you want to apply to this position?'
    />
  )
}

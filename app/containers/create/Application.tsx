import * as React from 'react'

import {ConfirmDialog} from '@components/lib/Dialog/Confirm'
import useAddApplication from '@hooks/application/useAddApplication'

export const CreateApplicationForm = ({id}: {id: number}): JSX.Element => {
  const handleConfirm = useAddApplication(id)
  return (
    <ConfirmDialog
      handleConfirm={handleConfirm}
      message='Are you sure you want to apply to this position?'
    />
  )
}

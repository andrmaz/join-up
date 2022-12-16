import * as React from 'react'

import Dialog from '@lib/Dialog'
import useAddApplication from '@hooks/application/useAddApplication'

const CreateApplicationForm = ({id}: {id: number}): JSX.Element => {
  const [handleConfirm] = useAddApplication(id)
  return (
    <Dialog
      handleConfirm={handleConfirm}
      message='Are you sure you want to apply to this position?'
    />
  )
}

export {CreateApplicationForm}

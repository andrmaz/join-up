import * as React from 'react'

import useEditUserEmail from '@hooks/user/useEditUserEmail'

import Panel from '@components/route/Tablist/Panel'
import EmailForm from '@components/Form/user/Email'
import SnackBar from '@components/lib/SnackBar/SnackBar'

const EditEmail = ({isSelectedTab}: {isSelectedTab: boolean}): JSX.Element => {
  const [isSuccess, successMessage, handleClose, onSubmit] = useEditUserEmail()
  return (
    <Panel index={2} isSelectedTab={isSelectedTab}>
      <EmailForm onSubmit={onSubmit} />
      {isSuccess && (
        <SnackBar
          color='green'
          message={successMessage}
          onClose={handleClose}
        />
      )}
    </Panel>
  )
}

export default React.memo(EditEmail)

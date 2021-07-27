import * as React from 'react'

import useEditUserPassword from '@hooks/user/useEditUserPassword'

import Panel from '@components/route/Tablist/Panel'
import PasswordForm from '@components/Form/user/Password'
import SnackBar from '@components/lib/SnackBar/SnackBar'

const EditPassword = ({
  isSelectedTab,
}: {
  isSelectedTab: boolean
}): JSX.Element => {
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUserPassword()
  return (
    <Panel index={3} isSelectedTab={isSelectedTab}>
      <PasswordForm onSubmit={onSubmit} />
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

export default React.memo(EditPassword)

import * as React from 'react'

import useEditUserPassword from '@hooks/user/useEditUserPassword'

import Panel from '@components/route/Tablist/Panel'
import PasswordForm from '@components/Form/user/Password'
import SnackBar from '@components/lib/SnackBar/SnackBar'

import type {PanelPropsType} from 'app/types/components'

const EditPassword = ({token, isSelectedTab}: PanelPropsType): JSX.Element => {
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUserPassword(token)
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

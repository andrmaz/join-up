import * as React from 'react'

import useEditUserEmail from '@hooks/user/useEditUserEmail'

import Panel from '@components/route/Tablist/Panel'
import EmailForm from '@components/Form/user/Email'
import SnackBar from '@components/lib/SnackBar/SnackBar'

import type {PanelPropsType} from 'app/types/components'

const EditEmail = ({token, isSelectedTab}: PanelPropsType): JSX.Element => {
  const [isSuccess, successMessage, handleClose, onSubmit] =
    useEditUserEmail(token)
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

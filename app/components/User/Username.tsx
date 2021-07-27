import * as React from 'react'
import useEditUsername from '@hooks/user/useEditUsername'

import Panel from '@components/route/Tablist/Panel'
import UsernameForm from '@components/Form/user/Username'
import SnackBar from '@components/lib/SnackBar/SnackBar'

const EditUsername = ({
  isSelectedTab,
}: {
  isSelectedTab: boolean
}): JSX.Element => {
  const [isSuccess, successMessage, handleClose, onSubmit] = useEditUsername()
  return (
    <Panel index={1} isSelectedTab={isSelectedTab}>
      <UsernameForm onSubmit={onSubmit} />
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

export default React.memo(EditUsername)

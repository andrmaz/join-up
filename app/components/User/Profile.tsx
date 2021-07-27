import * as React from 'react'
import useEditUserData from '@hooks/user/useEditUserData'

import Panel from '@components/route/Tablist/Panel'
import SnackBar from '@components/lib/SnackBar/SnackBar'
import ProfileForm from '@components/Form/user/Profile'

const EditProfile = ({
  isSelectedTab,
}: {
  isSelectedTab: boolean
}): JSX.Element => {
  const [isSuccess, successMessage, handleClose, onSubmit] = useEditUserData()
  return (
    <Panel index={0} isSelectedTab={isSelectedTab}>
      <ProfileForm onSubmit={onSubmit} />
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

export default React.memo(EditProfile)

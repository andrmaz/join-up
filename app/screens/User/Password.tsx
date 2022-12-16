import * as React from 'react'

import Panel from '@lib/Tablist/Panel'
import PasswordForm from '@components/Form/Password'
import useEditUserPassword from '@hooks/user/useEditUserPassword'

const EditPassword = ({
  isSelectedTab,
}: {
  isSelectedTab: boolean
}): JSX.Element => {
  const [onSubmit] = useEditUserPassword()
  return (
    <Panel index={3} isSelectedTab={isSelectedTab}>
      <PasswordForm onSubmit={onSubmit} />
    </Panel>
  )
}

export default React.memo(EditPassword)

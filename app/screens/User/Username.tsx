import * as React from 'react'

import Panel from '@lib/Tablist/Panel'
import UsernameForm from '@components/Form/Username'
import useEditUsername from '@hooks/user/useEditUsername'

const EditUsername = ({
  isSelectedTab,
}: {
  isSelectedTab: boolean
}): JSX.Element => {
  const [onSubmit] = useEditUsername()
  return (
    <Panel index={1} isSelectedTab={isSelectedTab}>
      <UsernameForm onSubmit={onSubmit} />
    </Panel>
  )
}

export default React.memo(EditUsername)

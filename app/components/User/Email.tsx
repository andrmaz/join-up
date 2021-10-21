import * as React from 'react'

import EmailForm from '@components/Form/Email'
import Panel from '@components/route/Tablist/Panel'
import useEditUserEmail from '@hooks/user/useEditUserEmail'

const EditEmail = ({isSelectedTab}: {isSelectedTab: boolean}): JSX.Element => {
  const onSubmit = useEditUserEmail()
  return (
    <Panel index={2} isSelectedTab={isSelectedTab}>
      <EmailForm onSubmit={onSubmit} />
    </Panel>
  )
}

export default React.memo(EditEmail)

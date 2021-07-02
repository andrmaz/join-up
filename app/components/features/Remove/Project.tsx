import * as React from 'react'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useRemoveProject from '@hooks/remove/useRemoveProject'
import AlertDialog from '@components/notifications/Dialog/Alert'
import type {RemoveProjectType} from 'app/types/project'

const RemoveProject = ({
  uid,
  showDialog,
  setShowDialog,
}: RemoveProjectType): JSX.Element => {
  const token = useSessionCookie()
  const handleConfirm = useRemoveProject(token, uid, setShowDialog)
  return (
    <AlertDialog
      title='Delete this project'
      message='Are you sure you want to delete this project?'
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      handleConfirm={handleConfirm}
    />
  )
}

export default RemoveProject

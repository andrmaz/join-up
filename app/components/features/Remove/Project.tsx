import * as React from 'react'
import {useCookies} from 'react-cookie'
import useRemoveProject from '@hooks/remove/useRemoveProject'
import AlertDialog from '@components/notifications/Dialog/Alert'

const RemoveProject = ({
  uid,
  showDialog,
  setShowDialog,
}: {
  uid: string
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<typeof showDialog>>
}): JSX.Element => {
  //* Get user token from session cookie
  const [cookies] = useCookies(['session'])
  const {session: token} = cookies
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

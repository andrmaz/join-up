import * as React from 'react'
import useSessionCookie from '@hooks/cookie/useSessionCookie'
import useRemovePosition from '@hooks/remove/useRemovePosition'
import AlertDialog from '@components/notifications/Dialog/Alert'

const RemovePosition = ({
  uid,
  showDialog,
  setShowDialog,
}: {
  uid: string
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<boolean>>
}): JSX.Element => {
  const token = useSessionCookie()
  const handleConfirm = useRemovePosition(token, uid, setShowDialog)
  return (
    <AlertDialog
      title='Delete this position'
      message='Are you sure you want to delete this position?'
      showDialog={showDialog}
      setShowDialog={setShowDialog}
      handleConfirm={handleConfirm}
    />
  )
}

export default RemovePosition

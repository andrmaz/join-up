export type AlertDialogType = {
  title?: string
  message: string
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<typeof showDialog>>
  handleConfirm: () => Promise<unknown>
}

export type ConfirmDialogType = {
  uid: number
  title?: string
  message: string
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<typeof showDialog>>
}

export type SnackBarType = {
  color: string
  message: string
  onClose: () => void
}

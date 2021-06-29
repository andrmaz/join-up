export type AlertDialogType = {
  title?: string
  message: string
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<typeof showDialog>>
  handleConfirm: () => Promise<unknown>
}

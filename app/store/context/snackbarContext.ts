import * as React from 'react'

export const SnackbarContext = React.createContext<
  {addAlert: (alert: string) => void} | undefined
>(undefined)

SnackbarContext.displayName = 'Snackbar Context'

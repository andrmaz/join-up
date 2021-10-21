import * as React from 'react'

import {SnackbarContext} from '@context/snackbarContext'

export default function useSnackbarContext(): {
  addAlert: (alert: string) => void
} {
  const context = React.useContext(SnackbarContext)
  if (context === undefined) {
    throw new Error(
      'useSnackbarContext must be used within a Snackbar Provider'
    )
  }
  return context
}

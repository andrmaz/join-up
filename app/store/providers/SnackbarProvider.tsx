import * as React from 'react'

import type {ChildrenPropsType} from 'app/types/modal'
import SnackBar from '@components/lib/SnackBar/SnackBar'
import {SnackbarContext} from '@context/snackbarContext'

const timeout = 5000

export const SnackbarProvider = ({
  children,
}: ChildrenPropsType): JSX.Element => {
  const [alerts, setAlerts] = React.useState<string[]>([])
  const activeAlertIds = alerts.join(',')
  React.useEffect(() => {
    if (activeAlertIds.length > 0) {
      const timer = setTimeout(
        () => setAlerts(alerts => alerts.slice(0, alerts.length - 1)),
        timeout
      )
      return () => clearTimeout(timer)
    }
  }, [activeAlertIds])
  //* append a new alert without destroying existing ones
  const addAlert = React.useCallback(
    (alert: string) => setAlerts((alerts: string[]) => [alert, ...alerts]),
    []
  )

  const value = {addAlert}
  return (
    <SnackbarContext.Provider value={value}>
      {children}
      {alerts.map((alert, index) => (
        <SnackBar key={`alert-${index}`} alert={alert} />
      ))}
    </SnackbarContext.Provider>
  )
}

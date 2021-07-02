import * as React from 'react'

import {AuthDispatchContext} from '@context/authContext'
import type {UserDispatchType} from 'app/types/user'

export function useAuthDispatch(): UserDispatchType {
  const context = React.useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }
  return context
}

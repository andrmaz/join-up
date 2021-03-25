import * as React from 'react'

import {AuthDispatchContext} from '@context/authContext'
import type {UserDispatch} from 'app/types/user'

export function useAuthDispatch(): UserDispatch {
  const context = React.useContext(AuthDispatchContext)
  if (context === undefined) {
    throw new Error('useAuthDispatch must be used within a AuthProvider')
  }
  return context
}

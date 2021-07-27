import * as React from 'react'

import {AuthStateContext} from '@context/authContext'
import type {UserContextType} from 'app/types/user'

export function useAuthState(): UserContextType {
  const context = React.useContext(AuthStateContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within a AuthProvider')
  }
  return context
}

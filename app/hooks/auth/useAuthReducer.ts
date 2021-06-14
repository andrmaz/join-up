import * as React from 'react'

import {authReducer} from '@reducers/authReducer'
import {UserState, UserActions} from 'app/types/user'

export function useAuthReducer(): [
  UserState,
  React.Dispatch<UserActions>,
  React.EffectCallback
] {
  const [state, dispatch] = React.useReducer(authReducer, {user: null})
  const {user} = state
  const serializedUser = JSON.stringify(user)
  const updateLocalStorage = React.useCallback(() => {
    document.cookie.includes('session')
      ? window.localStorage.setItem('user', serializedUser)
      : window.localStorage.removeItem('user')
  }, [serializedUser])
  return [state, dispatch, updateLocalStorage]
}

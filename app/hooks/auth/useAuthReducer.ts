import * as React from 'react'

import {UserActionsType, UserContextType} from 'app/types/user'

import {authReducer} from '@reducers/authReducer'

export function useAuthReducer(): readonly [
  UserContextType,
  React.Dispatch<UserActionsType>,
  React.EffectCallback
] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<UserContextType, UserActionsType>
  >(authReducer, {user: null})
  const user = state.user
  const serializedUser = JSON.stringify(user)
  const updateLocalStorage = React.useCallback(() => {
    user
      ? window.localStorage.setItem('user', serializedUser)
      : window.localStorage.removeItem('user')
  }, [serializedUser, user])
  return [state, dispatch, updateLocalStorage] as const
}

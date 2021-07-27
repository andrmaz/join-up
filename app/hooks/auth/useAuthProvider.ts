import * as React from 'react'

import {useAuthReducer} from '@hooks/auth/useAuthReducer'

import {UserContextType, UserActionsType} from 'app/types/user'

export function useAuthProvider(): [
  UserContextType,
  React.Dispatch<UserActionsType>
] {
  const [state, dispatch, updateLocalStorage] = useAuthReducer()

  //? set state to local storage until user exists
  React.useEffect(() => {
    //* You now have access to `window`
    updateLocalStorage()
  }, [updateLocalStorage])

  return [state, dispatch]
}

import * as React from 'react'

import {useAuthReducer} from '@hooks/auth/useAuthReducer'
import {login} from '@actions/authActions'
import {UserState, UserActionsType} from 'app/types/user'

export function useAuthProvider(): [
  UserState,
  React.Dispatch<UserActionsType>
] {
  const [state, dispatch, updateLocalStorage] = useAuthReducer()

  //* persist state on page refresh
  React.useEffect(() => {
    //* You now have access to `window`
    const isSession = document.cookie.includes('session')
    if (isSession) {
      const userInLocalStorage = window.localStorage.getItem('user')
      userInLocalStorage && login(dispatch, JSON.parse(userInLocalStorage))
    }
  }, [dispatch])

  //* and then pass the state along to the client until session cookie exists
  React.useEffect(() => {
    //* You now have access to `window`
    updateLocalStorage()
  }, [updateLocalStorage])

  return [state, dispatch]
}

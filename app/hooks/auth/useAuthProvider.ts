import * as React from 'react'

import {useCookies} from 'react-cookie'
import {useAuthReducer} from '@hooks/auth/useAuthReducer'

//import {login} from '@actions/authActions'
import {UserState, UserActionsType} from 'app/types/user'

export function useAuthProvider(): [
  UserState,
  React.Dispatch<UserActionsType>
] {
  const [state, dispatch, updateLocalStorage] = useAuthReducer()
  const [, , removeCookie] = useCookies(['session'])

  const alertUser = React.useCallback(
    (e: BeforeUnloadEvent) => {
      //* Cancel the event
      e.preventDefault()
      //TODO Fix user state persist
      removeCookie('session', {path: '/', sameSite: true})
      //* Chrome requires returnValue to be set
      e.returnValue =
        'Are you sure you want to exit? You will be redirected to the login page'
    },
    [removeCookie]
  )

  //* handling page refresh
  React.useEffect(() => {
    //* You now have access to `window`
    window.addEventListener('beforeunload', alertUser)
    return () => window.removeEventListener('beforeunload', alertUser)
  }, [alertUser])

  //TODO persist state on page refresh
  /* React.useEffect(() => {
    //* You now have access to `window`
    const isSession = document.cookie.includes('session')
    if (isSession) {
      const userInLocalStorage = window.localStorage.getItem('user')
      userInLocalStorage && login(dispatch, JSON.parse(userInLocalStorage))
    }
  }, [dispatch]) */

  //* and then pass the state along to the client until session cookie exists
  React.useEffect(() => {
    //* You now have access to `window`
    updateLocalStorage()
  }, [updateLocalStorage])

  return [state, dispatch]
}

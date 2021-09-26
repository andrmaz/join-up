import * as React from 'react'

import {UserActionsType, UserContextType} from 'app/types/user'

import Router from 'next/router'
import {publicFetch} from '@utils/fetch'
import {useAuthReducer} from '@hooks/auth/useAuthReducer'

export function useAuthProvider(): [
  UserContextType,
  React.Dispatch<UserActionsType>
] {
  const [state, dispatch, updateLocalStorage] = useAuthReducer()

  const alertUser = React.useCallback(async (e: BeforeUnloadEvent) => {
    //* Cancel the event
    e.preventDefault()
    //* Remove Token Cookie
    await publicFetch.get('/user/logout')
    Router.replace('/signin')
    //* Chrome requires returnValue to be set
    e.returnValue =
      'Are you sure you want to exit? You will be redirected to the login page'
  }, [])

  //* handling page refresh
  React.useEffect(() => {
    //* You now have access to `window`
    window.addEventListener('beforeunload', alertUser)
    return () => window.removeEventListener('beforeunload', alertUser)
  }, [alertUser])

  //? set state to local storage until user exists
  React.useEffect(() => {
    //* You now have access to `window`
    updateLocalStorage()
  }, [updateLocalStorage])

  return [state, dispatch]
}

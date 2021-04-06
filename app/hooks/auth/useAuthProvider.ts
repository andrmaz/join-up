import * as React from 'react'

import {useAuthReducer} from '@hooks/auth/useAuthReducer'
import {login} from '@actions/authActions'

export function useAuthProvider(): ReadonlyArray<any> {
  const [state, dispatch, updateLocalStorage] = useAuthReducer()

  //* persist state on page refresh
  React.useEffect(() => {
    //* You now have access to `window`
    const userInLocalStorage = window.localStorage.getItem('user')
    userInLocalStorage && login(dispatch, JSON.parse(userInLocalStorage))
    //* dispatch can be ignored since it comes from a reducer
    //* dispatch must be ignored to ensure the effect will be called
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  //* and then pass the state along to the client until session cookie exists
  React.useEffect(() => {
    //* You now have access to `window`
    updateLocalStorage()
  }, [updateLocalStorage])

  return [state, dispatch] as const
}

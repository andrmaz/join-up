import {AuthDispatchContext, AuthStateContext} from '@context/authContext'

import type {ChildrenPropsType} from 'app/types/modal'
import {useAuthProvider} from '@hooks/auth/useAuthProvider'

export function AuthProvider({children}: ChildrenPropsType): JSX.Element {
  const [state, dispatch] = useAuthProvider()

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

import {useAuthProvider} from '@hooks/auth/useAuthProvider'
import {AuthStateContext, AuthDispatchContext} from '@context/authContext'
import type {ContainerPropsType} from 'app/types/container'

export function AuthProvider({children}: ContainerPropsType): JSX.Element {
  const [state, dispatch] = useAuthProvider()

  return (
    <AuthStateContext.Provider value={state}>
      <AuthDispatchContext.Provider value={dispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthStateContext.Provider>
  )
}

import {useAuthProvider} from '@hooks/useAuthProvider'
import {AuthStateContext, AuthDispatchContext} from '@context/authContext'
import type {UserProviderProps} from 'app/types/user'

export function AuthProvider({children}: UserProviderProps): JSX.Element {
    const [state, dispatch] = useAuthProvider()

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

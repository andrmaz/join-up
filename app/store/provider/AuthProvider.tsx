import * as React from 'react'

import {UserProviderProps} from '../../type/user'
import {useAuthProvider} from '../../hook/useAuthProvider'
import {AuthStateContext, AuthDispatchContext} from '../context/authContext'

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

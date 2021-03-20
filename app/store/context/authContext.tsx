import * as React from 'react'

import {UserState, UserDispatch} from '../../type/user'

export const AuthStateContext = React.createContext<UserState | undefined>(
    undefined
)
AuthStateContext.displayName = 'Auth State Context'

export const AuthDispatchContext = React.createContext<
    UserDispatch | undefined
>(undefined)

AuthDispatchContext.displayName = 'Auth Dispatch Context'

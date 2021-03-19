import * as React from 'react'

import {UserState, UserDispatch} from '../../type/user'

export const AuthStateContext = React.createContext<UserState | undefined>(
    undefined
)
export const AuthDispatchContext = React.createContext<
    UserDispatch | undefined
>(undefined)

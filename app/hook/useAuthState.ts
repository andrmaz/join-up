import * as React from 'react'

import {AuthStateContext} from '../store/context/authContext'
import {UserState} from '../type/user'

export function useAuthState(): UserState {
    const context = React.useContext(AuthStateContext)
    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider')
    }
    return context
}

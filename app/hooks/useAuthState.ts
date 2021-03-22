import * as React from 'react'

import {AuthStateContext} from '@context/authContext'
import type {UserState} from 'app/types/user'

export function useAuthState(): UserState {
    const context = React.useContext(AuthStateContext)
    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider')
    }
    return context
}

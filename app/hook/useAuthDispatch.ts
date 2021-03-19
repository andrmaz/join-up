import * as React from 'react'

import {AuthDispatchContext} from '../store/context/authContext'
import {UserDispatch} from '../type/user'

export function useAuthDispatch(): UserDispatch {
    const context = React.useContext(AuthDispatchContext)
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider')
    }
    return context
}

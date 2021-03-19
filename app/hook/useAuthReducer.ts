import * as React from 'react'

import {authReducer} from '../store/reducer/authReducer'

export function useAuthReducer(): ReadonlyArray<any> {
    const [state, dispatch] = React.useReducer(authReducer, {user: null})
    const {user} = state
    const updateLocalStorage = React.useCallback(() => {
        document.cookie.includes('session')
            ? window.localStorage.setItem('user', JSON.stringify(user))
            : window.localStorage.removeItem('user')
    }, [user])
    return [state, dispatch, updateLocalStorage] as const
}

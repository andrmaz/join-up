/* eslint-disable @typescript-eslint/no-empty-function */
import {createContext, useReducer, useContext, useEffect} from 'react'
import {
    UserContextInterface,
    UserState,
    UserDispatch,
    UserActions,
    UserProviderProps,
} from '../types/user'

const AuthStateContext = createContext<UserState | undefined>(undefined)
const AuthDispatchContext = createContext<UserDispatch | undefined>(undefined)

function initState(initialValue: UserContextInterface | null): UserState {
    return {user: initialValue}
}

function authReducer(state: UserState, action: UserActions): UserState {
    switch (action.type) {
        case 'login':
            return {
                user: action.payload,
            }
        case 'logout':
            return {
                user: null,
            }
        case 'persist':
            return initState(action.payload)
        default: {
            throw new Error(`Unhandled type at ${action} action`)
        }
    }
}

function AuthProvider({children}: UserProviderProps): JSX.Element {
    const [state, dispatch] = useReducer(authReducer, null, initState)

    //* persist State through all the pages
    useEffect(() => {
        const userInLocalStorage = localStorage.getItem('user')
        if (userInLocalStorage) {
            dispatch({
                type: 'persist',
                payload: JSON.parse(userInLocalStorage),
            })
        }
    }, [])

    //* keep updated user state in local storage until session cookie exists
    useEffect(() => {
        const {user} = state
        if (document.cookie) {
            localStorage.setItem('user', JSON.stringify(user))
        } else {
            localStorage.removeItem('user')
        }
    }, [state])

    return (
        <AuthStateContext.Provider value={state}>
            <AuthDispatchContext.Provider value={dispatch}>
                {children}
            </AuthDispatchContext.Provider>
        </AuthStateContext.Provider>
    )
}

function useAuthState(): UserState {
    const context = useContext(AuthStateContext)
    if (context === undefined) {
        throw new Error('useAuthState must be used within a AuthProvider')
    }
    return context
}
function useAuthDispatch(): UserDispatch {
    const context = useContext(AuthDispatchContext)
    if (context === undefined) {
        throw new Error('useAuthDispatch must be used within a AuthProvider')
    }
    return context
}
export {AuthProvider, useAuthState, useAuthDispatch}

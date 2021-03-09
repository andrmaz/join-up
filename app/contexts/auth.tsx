/* eslint-disable @typescript-eslint/no-empty-function */
import {createContext, useReducer, useContext, useEffect} from 'react'
import {
    UserState,
    UserDispatch,
    UserActions,
    UserProviderProps,
} from '../types/user'

const AuthStateContext = createContext<UserState | undefined>(undefined)
const AuthDispatchContext = createContext<UserDispatch | undefined>(undefined)

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
            return {
                user: action.payload,
            }
        default: {
            throw new Error(`Unhandled type at ${action} action`)
        }
    }
}

function AuthProvider({children}: UserProviderProps): JSX.Element {
    const [state, dispatch] = useReducer(authReducer, {user: null})

    //* create a fresh, new store instance on every request
    useEffect(() => {
        const userInLocalStorage = window.localStorage.getItem('user')
        if (userInLocalStorage) {
            dispatch({
                type: 'persist',
                payload: JSON.parse(userInLocalStorage),
            })
        }
        return () => dispatch({type: 'logout'})
    }, [])

    //* and then pass the state along to the client until session cookie exists
    useEffect(() => {
        if (!document.cookie.includes('session')) {
            window.localStorage.removeItem('user')
            return dispatch({type: 'logout'})
        }
        window.localStorage.setItem('user', JSON.stringify(state.user))
    }, [JSON.stringify(state.user)])

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

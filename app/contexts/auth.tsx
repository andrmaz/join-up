/* eslint-disable @typescript-eslint/no-empty-function */
import {createContext, useReducer} from 'react'
import {UserContextInterface, UserState, UserActions} from '../types/user'

const initialState: UserState = {
    user: null,
    login: () => {},
    logout: () => {},
}

const AuthContext = createContext<UserState | null>(null)

function authReducer(state: UserState, action: UserActions): UserState {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                user: action.payload,
            }
        case 'logout':
            return {
                ...state,
                user: null,
            }
        default:
            return state
    }
}

function AuthProvider(
    props: React.PropsWithChildren<Record<string, unknown>>
): JSX.Element {
    const [state, dispatch] = useReducer(authReducer, initialState)

    function login(data: UserContextInterface): void {
        dispatch({
            type: 'login',
            payload: data,
        })
    }
    function logout(): void {
        dispatch({type: 'logout'})
    }

    return (
        <AuthContext.Provider
            value={{user: state.user, login, logout}}
            {...props}
        />
    )
}

export {AuthContext, AuthProvider}

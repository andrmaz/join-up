/* eslint-disable @typescript-eslint/no-empty-function */
import React, {createContext, useReducer} from 'react'
import {UserContextInterface, UserState, UserActions} from '../types/user'
import {useEffect} from 'react'

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
    const [state, dispatch] = useReducer<React.Reducer<UserState, UserActions>>(
        authReducer,
        initialState
    )

    //* persist State through all the pages
    useEffect(() => {
        const currentUser = localStorage.getItem('user')
        //* check if session cookie is set
        //* check if user value in localStorage is a string - TypeScript validation
        if (document.cookie && typeof currentUser === 'string') {
            login(JSON.parse(currentUser))
        } else {
            logout()
        }
    }, [])

    function login(data: UserContextInterface): void {
        localStorage.setItem('user', JSON.stringify(data))
        dispatch({
            type: 'login',
            payload: data,
        })
    }
    function logout(): void {
        localStorage.removeItem('user')
        dispatch({type: 'logout'})
    }

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                login,
                logout,
            }}
            {...props}
        />
    )
}

export {AuthContext, AuthProvider}

import {createContext, useReducer} from 'react'
import {UserContextInterface, UserState, UserActions} from '../types/user'

const initialState: UserState = {
    user: null,
}

const AuthContext = createContext<typeof initialState>(initialState)

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

// TODO: Specify a different type
function AuthProvider(
    props: React.PropsWithChildren<Record<string, unknown>>
): JSX.Element {
    const [state, dispatch] = useReducer(authReducer, initialState)

    function login(data: UserContextInterface): void {
        localStorage.setItem('jwtToken', data.token)
        dispatch({
            type: 'login',
            payload: data,
        })
    }
    function logout(): void {
        localStorage.removeItem('jwtToken')
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

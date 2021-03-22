import type {UserState, UserActions} from 'app/types/user'

export function authReducer(state: UserState, action: UserActions): UserState {
    switch (action.type) {
        case 'login':
            return {
                user: action.payload,
            }
        case 'logout':
            return {
                user: null,
            }
        default: {
            throw new Error(`Unhandled type at ${action} action`)
        }
    }
}

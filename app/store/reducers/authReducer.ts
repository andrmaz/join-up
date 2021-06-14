import type {UserState, UserActions, UserData} from 'app/types/user'

export function authReducer(state: UserState, action: UserActions): UserState {
  let userCopy: UserData
  let updatedUser: UserData
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
    case 'edit':
      userCopy = Object.assign({}, state.user)
      updatedUser = Object.assign({...userCopy}, action.payload)
      return {
        ...state,
        user: updatedUser,
      }
    default: {
      throw new Error(`Unhandled type at ${action} action`)
    }
  }
}

import type {
  UserStateType,
  UserContextType,
  UserActionsType,
} from 'app/types/user'
import {UActions} from 'app/types/constants'

export function authReducer(
  state: UserContextType,
  action: UserActionsType
): UserContextType {
  let userCopy: UserStateType
  let updatedUser: UserStateType
  switch (action.type) {
    case UActions.login:
      return {
        ...state,
        user: action.payload,
      }
    case UActions.logout:
      return {
        ...state,
        user: null,
      }
    case UActions.edit:
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

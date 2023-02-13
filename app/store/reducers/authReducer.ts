import type {
  UserStateType,
  UserContextType,
  UserActionsType,
} from 'app/types/user'
import {UAction} from 'app/types/constants'

export function authReducer(
  state: UserContextType,
  action: UserActionsType
): UserContextType {
  let userCopy: UserStateType
  let updatedUser: UserStateType
  switch (action.type) {
    case UAction.login:
      return {
        ...state,
        user: action.payload,
      }
    case UAction.logout:
      return {
        ...state,
        user: null,
      }
    case UAction.edit:
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

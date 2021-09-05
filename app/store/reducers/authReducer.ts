import type {
  UserStateType,
  UserContextType,
  UserActionsType,
} from 'app/types/user'
import {Actions} from 'app/types/user'

export function authReducer(
  state: UserContextType,
  action: UserActionsType
): UserContextType {
  let userCopy: UserStateType
  let updatedUser: UserStateType
  switch (action.type) {
    case Actions.login:
      return {
        ...state,
        user: action.payload,
      }
    case Actions.logout:
      return {
        ...state,
        user: null,
      }
    case Actions.edit:
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

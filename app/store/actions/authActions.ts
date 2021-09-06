import type {UserDispatchType, UserStateType} from 'app/types/user'
import {UActions} from 'app/types/constants'

export const login = (dispatch: UserDispatchType, data: UserStateType): void =>
  dispatch({type: UActions.login, payload: data})
export const logout = (dispatch: UserDispatchType): void =>
  dispatch({type: UActions.logout})
export const edit = (dispatch: UserDispatchType, data: UserStateType): void =>
  dispatch({type: UActions.edit, payload: data})

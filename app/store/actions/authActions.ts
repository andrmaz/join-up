import type {UserDispatchType, UserStateType} from 'app/types/user'
import {UAction} from 'app/types/constants'

export const login = (dispatch: UserDispatchType, data: UserStateType): void =>
  dispatch({type: UAction.login, payload: data})
export const logout = (dispatch: UserDispatchType): void =>
  dispatch({type: UAction.logout})
export const edit = (dispatch: UserDispatchType, data: UserStateType): void =>
  dispatch({type: UAction.edit, payload: data})

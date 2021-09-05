import {Actions} from 'app/types/user'
import type {UserDispatchType, UserStateType} from 'app/types/user'

export const login = (dispatch: UserDispatchType, data: UserStateType): void =>
  dispatch({type: Actions.login, payload: data})
export const logout = (dispatch: UserDispatchType): void =>
  dispatch({type: Actions.logout})
export const edit = (dispatch: UserDispatchType, data: UserStateType): void =>
  dispatch({type: Actions.edit, payload: data})

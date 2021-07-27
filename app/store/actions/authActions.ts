import type {UserDispatchType, UserStateType} from 'app/types/user'

export const login = (dispatch: UserDispatchType, data: UserStateType): void =>
  dispatch({type: 'login', payload: data})
export const logout = (dispatch: UserDispatchType): void =>
  dispatch({type: 'logout'})
export const edit = (dispatch: UserDispatchType, data: UserStateType): void =>
  dispatch({type: 'edit', payload: data})

import type {UserDispatchType, IUserContext} from 'app/types/user'

export const login = (dispatch: UserDispatchType, data: IUserContext): void =>
  dispatch({type: 'login', payload: data})
export const logout = (dispatch: UserDispatchType): void =>
  dispatch({type: 'logout'})
export const edit = (dispatch: UserDispatchType, data: IUserContext): void =>
  dispatch({type: 'edit', payload: data})

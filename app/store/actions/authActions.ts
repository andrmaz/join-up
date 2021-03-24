import type {UserDispatch, IUserContext} from 'app/types/user'

export const login = (dispatch: UserDispatch, data: IUserContext): void =>
    dispatch({type: 'login', payload: data})
export const logout = (dispatch: UserDispatch): void =>
    dispatch({type: 'logout'})
export const edit = (dispatch: UserDispatch, data: IUserContext): void =>
    dispatch({type: 'edit', payload: data})

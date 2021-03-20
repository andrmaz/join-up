import {UserDispatch, IUserContext} from '../../type/user'

export const login = (dispatch: UserDispatch, data: IUserContext): void =>
    dispatch({type: 'login', payload: data})
export const logout = (dispatch: UserDispatch): void =>
    dispatch({type: 'logout'})

import type {IAuthUser} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'
import {edit} from '@actions/authActions'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useFetchContext} from '@hooks/fetch/useFetchContext'
import useSnackbarContext from '@hooks/snackbar/useSnackbarContext'

export default function useEditUserData(): readonly [
  (data: IAuthUser) => Promise<UserResponseType>
] {
  const fetchContext = useFetchContext()
  const {addAlert} = useSnackbarContext()
  const dispatch = useAuthDispatch()
  const onSubmit = async (data: IAuthUser): Promise<UserResponseType> => {
    try {
      const response = await fetchContext.authAxios.patch<UserResponseType>(
        '/user',
        {user: data}
      )
      if (response.status === 200) {
        const {user, message} = response.data
        edit(dispatch, user)
        addAlert(message)
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [onSubmit] as const
}

import type {IEditEmail} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'
import {edit} from '@actions/authActions'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useFetchContext} from '@hooks/fetch/useFetchContext'
import useSnackbarContext from '@hooks/snackbar/useSnackbarContext'

export default function useEditUserEmail(): (
  data: IEditEmail
) => Promise<UserResponseType> {
  const dispatch = useAuthDispatch()
  const fetchContext = useFetchContext()
  const {addAlert} = useSnackbarContext()
  const onSubmit = async (data: IEditEmail): Promise<UserResponseType> => {
    try {
      const response = await fetchContext.authAxios.patch<UserResponseType>(
        '/user/email',
        {
          user: data,
        }
      )
      if (response) {
        const {user, message} = response.data
        edit(dispatch, user)
        addAlert(message)
        return Promise.resolve(response.data)
      } else {
        return Promise.reject({message: 'Something went wrong'})
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit //as const
}

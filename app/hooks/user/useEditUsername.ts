import type {IEditUsername} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'
import {edit} from '@actions/authActions'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useFetchContext} from '@hooks/fetch/useFetchContext'
import useSnackbarContext from '@hooks/snackbar/useSnackbarContext'

export default function useEditUsername(): (
  data: IEditUsername
) => Promise<UserResponseType> {
  const dispatch = useAuthDispatch()
  const fetchContext = useFetchContext()
  const {addAlert} = useSnackbarContext()
  const onSubmit = async (data: IEditUsername): Promise<UserResponseType> => {
    try {
      const response = await fetchContext.authAxios.patch<UserResponseType>(
        '/user/username',
        {user: data}
      )
      if (response.status == 200) {
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

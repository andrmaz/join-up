import type {IAuthUser} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'
import {edit} from '@actions/authActions'
import {trpc} from '@utils/trpc'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import useSnackbarContext from '@hooks/snackbar/useSnackbarContext'

export default function useEditUserData(): readonly [
  (data: IAuthUser) => Promise<UserResponseType>
] {
  const result = trpc.user.edit.useMutation()
  const {addAlert} = useSnackbarContext()
  const dispatch = useAuthDispatch()
  const onSubmit = async (data: IAuthUser): Promise<UserResponseType> => {
    try {
      const response = await result.mutateAsync(data)
      if (response.status === 200) {
        const {user, message} = response
        edit(dispatch, user)
        addAlert(message)
        return response
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [onSubmit] as const
}

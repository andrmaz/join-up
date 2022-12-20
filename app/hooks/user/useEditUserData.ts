import type {IAuthUser} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import useSnackbarContext from '@hooks/snackbar/useSnackbarContext'

export default function useEditUserData(): readonly [
  (data: IAuthUser) => Promise<UserResponseType>
] {
  const result = trpc.user.edit.useMutation()
  const {addAlert} = useSnackbarContext()
  const onSubmit = async (data: IAuthUser): Promise<UserResponseType> => {
    try {
      const response = await result.mutateAsync(data)
      if (response.status === 200) {
        addAlert(response.message)
        return response
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [onSubmit] as const
}

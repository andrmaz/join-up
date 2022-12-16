import type {IEditUsername} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'
import {edit} from '@actions/authActions'
import {trpc} from '@utils/trpc'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useAuthState} from '@hooks/auth/useAuthState'
import useSnackbarContext from '@hooks/snackbar/useSnackbarContext'

export default function useEditUsername(): readonly [
  (data: IEditUsername) => Promise<UserResponseType>
] {
  const {user} = useAuthState()
  const dispatch = useAuthDispatch()
  const result = trpc.user.edit.useMutation()
  const {addAlert} = useSnackbarContext()
  const onSubmit = async (data: IEditUsername): Promise<UserResponseType> => {
    try {
      if (!user?.id) throw Response
      const response = await result.mutateAsync({id: user.id, ...data})
      if (response.status == 200) {
        const {user, message} = response
        edit(dispatch, user)
        addAlert(message)
        return response
      } else {
        return Promise.reject({message: 'Something went wrong'})
      }
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [onSubmit] as const
}

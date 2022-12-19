import type {IEditPassword} from 'app/types/user'
import type {StatusResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import {useSession} from 'next-auth/react'
import useSnackbarContext from '@hooks/snackbar/useSnackbarContext'

export default function useEditUserPassword(): readonly [
  (data: IEditPassword) => Promise<StatusResponseType>
] {
  const {data: session} = useSession()
  const result = trpc.user.edit.useMutation()
  const {addAlert} = useSnackbarContext()
  const onSubmit = async (data: IEditPassword): Promise<StatusResponseType> => {
    try {
      if (!session?.user?.id) throw Response
      const response = await result.mutateAsync({id: session.user.id, ...data})
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

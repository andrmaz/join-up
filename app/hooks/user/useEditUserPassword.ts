import type {IEditPassword} from 'app/types/user'
import type {StatusResponseType} from 'app/types/response'
import {useFetchContext} from '@hooks/fetch/useFetchContext'
import useSnackbarContext from '@hooks/snackbar/useSnackbarContext'

export default function useEditUserPassword(): readonly [
  (data: IEditPassword) => Promise<StatusResponseType>
] {
  const fetchContext = useFetchContext()
  const {addAlert} = useSnackbarContext()
  const onSubmit = async (data: IEditPassword): Promise<StatusResponseType> => {
    try {
      const response = await fetchContext.authAxios.patch<StatusResponseType>(
        '/user/password',
        {
          user: data,
        }
      )
      if (response.status === 200) {
        addAlert(response.data.message)
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [onSubmit] as const
}

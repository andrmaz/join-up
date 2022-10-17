import type {ISigninInputs} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'
import {login} from '@actions/authActions'
import {publicFetch} from '@utils/fetch'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useRouter} from 'next/router'

export default function useUserLogin(): readonly [
  (data: ISigninInputs) => Promise<UserResponseType>
] {
  const router = useRouter()
  const dispatch = useAuthDispatch()
  const onSubmit = async (data: ISigninInputs): Promise<UserResponseType> => {
    try {
      const response = await publicFetch.post<UserResponseType>('/user/login', {
        user: data,
      })
      if (response.status === 200) {
        const {user} = response.data
        login(dispatch, user)
        router.push('/')
        return Promise.resolve(response.data)
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [onSubmit] as const
}

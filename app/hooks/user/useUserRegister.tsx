import {useRouter} from 'next/router'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'

import {login} from '@actions/authActions'
import {publicFetch} from '@utils/fetch'

import type {ISignupInputs} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'

export default function useUserRegister(): (
  data: ISignupInputs
) => Promise<UserResponseType> {
  const router = useRouter()
  const dispatch = useAuthDispatch()
  const onSubmit = async (data: ISignupInputs): Promise<UserResponseType> => {
    try {
      const response = await publicFetch.post<UserResponseType>(
        '/user/register',
        {
          user: data,
        }
      )
      if (response.status === 201) {
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
  return onSubmit
}

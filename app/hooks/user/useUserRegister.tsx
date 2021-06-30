import axios from 'axios'
import {useRouter} from 'next/router'
import {useCookies} from 'react-cookie'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {login} from '@actions/authActions'
import type {ISignupInputs} from 'app/types/user'
import type {UserResponseType} from 'app/types/response'

export default function useUserRegister(): (
  data: ISignupInputs
) => Promise<UserResponseType> {
  const router = useRouter()
  const dispatch = useAuthDispatch()
  const [, setCookie] = useCookies(['session'])
  const onSubmit = async (data: ISignupInputs): Promise<UserResponseType> => {
    try {
      const response = await axios.post<UserResponseType>('/user/register', {
        user: data,
      })
      if (response.status === 201) {
        login(dispatch, response.data.user)
        setCookie('session', response.data.token, {
          path: '/',
          // ? expiration date
          //maxAge: 3600, // Expires after 1hr
          sameSite: true,
          //httpOnly: true,
          //secure: true,
        })
        router.push('/')
        return Promise.resolve(response.data)
      }
      return response.data
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return onSubmit
}

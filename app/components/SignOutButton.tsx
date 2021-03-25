import {useRouter} from 'next/router'
import {useCookies} from 'react-cookie'

import {useAuthDispatch} from '@hooks/useAuthDispatch'
import {logout} from '@actions/authActions'

export const SignOutButton = (): JSX.Element => {
  const dispatch = useAuthDispatch()
  const [, , removeCookie] = useCookies(['session'])
  const router = useRouter()
  function signOut(): void {
    removeCookie('session', {path: '/', sameSite: true})
    logout(dispatch)
    router.push('/')
  }
  return (
    <button onClick={() => signOut()} className='text-left m-1'>
      Sign Out
    </button>
  )
}

import {logout} from '@actions/authActions'
import {publicFetch} from '@utils/fetch'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useRouter} from 'next/router'

export const SignOutButton = (): JSX.Element => {
  const dispatch = useAuthDispatch()
  const router = useRouter()
  async function signOut(): Promise<void> {
    await publicFetch.get('/user/logout')
    logout(dispatch)
    router.push('/signin')
    return
  }
  return (
    <button onClick={signOut} className='text-left m-1'>
      Sign Out
    </button>
  )
}

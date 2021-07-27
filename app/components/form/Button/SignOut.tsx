import {useRouter} from 'next/router'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'

//import {publicFetch} from '@utils/fetch'
import {logout} from '@actions/authActions'

export const SignOutButton = (): JSX.Element => {
  const dispatch = useAuthDispatch()
  const router = useRouter()
  async function signOut(): Promise<void> {
    //await publicFetch.delete('/user/logout')
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

import {logout} from '@actions/authActions'
import {trpc} from '@utils/trpc'
import {useAuthDispatch} from '@hooks/auth/useAuthDispatch'
import {useRouter} from 'next/router'

const SignOutButton = (): JSX.Element => {
  const router = useRouter()
  const result = trpc.user.logout.useMutation()
  const dispatch = useAuthDispatch()
  const signOut = async (): Promise<void> => {
    result.mutate()
    logout(dispatch)
    router.push('/signin')
  }
  return (
    <button onClick={signOut} className='text-left m-1'>
      Sign Out
    </button>
  )
}

export {SignOutButton}

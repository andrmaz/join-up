import {signOut} from 'next-auth/react'
import {useRouter} from 'next/router'

const SignOutButton = (): JSX.Element => {
  const router = useRouter()
  const onClick = async (): Promise<void> => {
    const {url} = await signOut({redirect: false, callbackUrl: '/signin'})
    router.push(url)
  }
  return (
    <button onClick={onClick} className='text-left m-1'>
      Sign Out
    </button>
  )
}

export {SignOutButton}

import {signOut} from 'next-auth/react'
import {useRouter} from 'next/router'

const SignOutButton = (): JSX.Element => {
  const router = useRouter()
  const onClick = async (): Promise<void> => {
    const {url} = await signOut({redirect: false, callbackUrl: '/signin'})
    router.push(url)
  }
  return (
    <div
      onClick={onClick}
      className='btn btn-ghost'
      onKeyDown={() => ''}
      role='button'
      tabIndex={0}
    >
      Sign Out
    </div>
  )
}

export default SignOutButton

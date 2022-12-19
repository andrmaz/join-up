import {useSession} from 'next-auth/react'

const UserAvatar = (): JSX.Element => {
  const {data: session} = useSession()

  const src = session?.user.image || ''
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img className='rounded-full object-cover' src={src} alt='user' />
  )
}
export default UserAvatar

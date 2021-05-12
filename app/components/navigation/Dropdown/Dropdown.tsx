import * as React from 'react'
import Link from 'next/link'
import {useAuthState} from '@hooks/auth/useAuthState'
import {SignOutButton} from '@components/form/Button/SignOut'

export function Dropdown(): JSX.Element {
  const {user} = useAuthState()
  const [visible, setVisible] = React.useState<boolean>(false)
  const toggleVisibility = (): void => setVisible(prevState => !prevState)
  return (
    <>
      <button className='flex-initial w-1/6' onClick={toggleVisibility}>
        <div>
          <img
            className='m-auto rounded-full'
            src={user?.avatar}
            alt='Profile'
          />
        </div>
      </button>
      {visible ? (
        <ul className='absolute lg:top-14 xl:top-16 xl:right-16 flex flex-col h-auto w-auto bg-gray-800 border-2 p-2 rounded z-40 text-xs'>
          <Link href={'/profile'}>
            <a className='flex-initial text-white m-1'>Your profile</a>
          </Link>
          <Link href={'/settings'}>
            <a className='flex-initial text-white m-1'>Settings</a>
          </Link>
          <SignOutButton />
        </ul>
      ) : (
        ''
      )}
    </>
  )
}

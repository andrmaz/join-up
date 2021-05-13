import * as React from 'react'
import Link from 'next/link'
import {useAuthState} from '@hooks/auth/useAuthState'
import {SignOutButton} from '@components/form/Button/SignOut'

export function Dropdown(): JSX.Element {
  const {user} = useAuthState()
  const [visible, setVisible] = React.useState<boolean>(false)
  const toggleVisibility = (): void => setVisible(prevState => !prevState)
  const ref = React.createRef<HTMLElement>()
  const handleClickOutside = React.useCallback(
    (event): void => {
      //* We need to check to make sure that our current is actually filled in with a DOM element.
      //* Then using the DOM method contains we ask our container if we have the event.target which is the DOM element that was clicked
      //* If we don't have the clicked target then that means it's outside of our container and we need to close our menu.
      if (ref.current && !ref.current.contains(event.target)) {
        setVisible(false)
      }
    },
    [ref]
  )
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    //* Cleanup
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [handleClickOutside])
  return (
    <nav role='navigation' className='w-1/6' ref={ref}>
      <button className='flex-initial' onClick={toggleVisibility}>
        <div className='w-full h-full'>
          <img
            className='m-auto rounded-full'
            src={user?.avatar}
            alt='Profile'
          />
        </div>
      </button>
      {visible && (
        <ul className='absolute top-14 xl:top-16 right-14 xl:right-16 flex flex-col h-auto w-auto bg-gray-800 border-2 p-2 rounded z-40 text-xs'>
          <Link href={'/profile'}>
            <a className='flex-initial text-white m-1'>Your profile</a>
          </Link>
          <Link href={'/settings'}>
            <a className='flex-initial text-white m-1'>Settings</a>
          </Link>
          <SignOutButton />
        </ul>
      )}
    </nav>
  )
}

import * as React from 'react'

import Link from 'next/link'
import {SignOutButton} from '@components/Button/SignOut'
import UserAvatar from '@screens/User/Avatar'

export function Dropdown(): JSX.Element {
  let timeOutId: NodeJS.Timeout
  const [isOpen, setIsOpen] = React.useState<boolean>(false)
  const onClickHandler = (): void => setIsOpen(!isOpen)

  //* We close the popover on the next tick by using setTimeout.
  //* This is necessary because we need to first check if
  //* another child of the element has received focus as
  //* the blur event fires prior to the new focus event.
  function onBlurHandler(): void {
    timeOutId = setTimeout(() => {
      setIsOpen(false)
    })
  }

  //* If a child receives focus, do not close the popover.
  function onFocusHandler(): void {
    clearTimeout(timeOutId)
  }

  return (
    <nav
      role='navigation'
      className='w-1/6'
      onBlur={onBlurHandler}
      onFocus={onFocusHandler}
    >
      <button
        className='relative inline-block flex-initial'
        onClick={onClickHandler}
        aria-haspopup='true'
        aria-expanded={isOpen}
      >
        <div className='w-8 h-8'>
          <UserAvatar />
        </div>
        {isOpen && (
          <ul className='absolute flex flex-col h-auto min-w-min	w-auto bg-gray-800 border-2 p-2 rounded z-40 text-xs'>
            <Link href={'/profile'}>
              <a className='flex-initial text-white m-1 whitespace-nowrap'>
                Your profile
              </a>
            </Link>
            <Link href={'/settings'}>
              <a className='flex-initial text-white m-1 whitespace-nowrap'>
                Settings
              </a>
            </Link>
            <SignOutButton />
          </ul>
        )}
      </button>
    </nav>
  )
}

import * as React from 'react'

import {Dropdown} from '@components/Dropdown/Dropdown'
import Link from 'next/link'
import {useAuthState} from '@hooks/auth/useAuthState'
import {useRouter} from 'next/router'

const Navbar = (): JSX.Element => {
  const {user} = useAuthState()
  const router = useRouter()
  return (
    <nav className='fixed top-0 flex justify-between items-center h-12 xl:h-16 w-screen bg-blue-800 text-white z-50 px-20 xl:px-40'>
      <div className='inline-flex justify-evenly w-3/12'>
        <Link href='/'>
          <a className='flex-initial'>Logo</a>
        </Link>
        {user && (
          <Link href='/projects'>
            <a className='flex-initial'>Projects</a>
          </Link>
        )}
      </div>
      {user ? (
        <div className='inline-flex justify-around items-center w-2/12 h-full'>
          <Link href='/new/project'>
            <a className='cursor-pointer'>&#43;</a>
          </Link>
          <Dropdown />
        </div>
      ) : (
        <div className='inline-flex justify-around items-center w-2/12 h-full'>
          {router.pathname === '/signup' ? (
            <Link href='/signin'>
              <a className='flex-initial'>SignIn</a>
            </Link>
          ) : (
            <Link href='/signup'>
              <a className='flex-initial'>SignUp</a>
            </Link>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar

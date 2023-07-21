import * as React from 'react'

import Dropdown from '@components/Dropdown/Dropdown'
import Link from 'next/link'
import {useRouter} from 'next/router'
import {useSession} from 'next-auth/react'

const Navbar = (): JSX.Element => {
  const router = useRouter()
  const {status} = useSession()
  const authenticated = status === 'authenticated'

  return (
    <nav className='navbar bg-base-100'>
      {authenticated && (
        <div className='inline-flex justify-evenly w-3/12'>
          <Link href='/'>
            <a className='flex-initial'>Logo</a>
          </Link>
          <Link href='/projects'>
            <a className='flex-initial'>Projects</a>
          </Link>
        </div>
      )}
      {authenticated ? (
        <div className='menu menu-horizontal px-1'>
          <Link href='/new/project'>
            <a className='cursor-pointer'>&#43;</a>
          </Link>
          <Dropdown />
        </div>
      ) : (
        <div className='menu menu-horizontal px-1'>
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

import * as React from 'react'
import {useRouter} from 'next/router'
import Link from 'next/link'
import {Dropdown} from '@components/navigation/Dropdown/Dropdown'
import {useAuthState} from '@hooks/auth/useAuthState'

const Navbar = (): JSX.Element => {
  const {user} = useAuthState()
  const router = useRouter()
  return (
    <nav className='fixed top-0 flex justify-between items-center h-20 w-screen bg-blue-800 text-white z-50'>
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
          <Link href='/new/project' passHref>
            <div className='cursor-pointer'>+</div>
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

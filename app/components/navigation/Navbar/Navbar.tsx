import * as React from 'react'
import Link from 'next/link'
import {Dropdown} from '@components/navigation/Dropdown/Dropdown'

const Navbar = (): JSX.Element => {
  const [tooltip, showTooltip] = React.useState(false)
  return (
    <nav className='fixed top-0 flex justify-between items-center h-20 w-screen bg-blue-800 text-white z-50'>
      <div className='inline-flex justify-evenly w-3/12'>
        <Link href='/'>
          <a className='flex-initial'>Logo</a>
        </Link>
        <Link href='/projects'>
          <a className='flex-initial'>Projects</a>
        </Link>
      </div>
      <div className='inline-flex justify-around items-center w-2/12 h-full'>
        <Link href='/new/project' passHref>
          <div
            onMouseEnter={() => showTooltip(true)}
            onMouseLeave={() => showTooltip(false)}
          >
            +
          </div>
        </Link>
        {tooltip ? (
          <span className='absolute top-12 lg:right-36 xl:right-48 text-center p-2 bg-gray-800 text-white text-xs cursor-pointer'>
            New Project
          </span>
        ) : (
          ''
        )}
        <Dropdown />
      </div>
    </nav>
  )
}

export default Navbar

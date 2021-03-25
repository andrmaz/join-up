import * as React from 'react'
import Link from 'next/link'
import {Dropdown} from '@components/Dropdown'

const Navbar = (): JSX.Element => {
    const [tooltip, showTooltip] = React.useState(false)
    return (
        <nav className='flex justify-between items-center h-8v w-screen bg-blue-800 text-white'>
            <div className='inline-flex justify-evenly w-5/12'>
                <Link href='/'>
                    <a className='flex-initial'>Logo</a>
                </Link>
                <Link href='/projects'>
                    <a className='flex-initial'>Projects</a>
                </Link>
                <Link href='/collabs'>
                    <a className='flex-initial'>Collaborators</a>
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

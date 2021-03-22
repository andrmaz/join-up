import Link from 'next/link'

import {useAuthState} from '@hooks/useAuthState'
import {Dropdown} from '@components/Dropdown'
import {dropDownProjectList, dropDownUserList} from '@data/dropDownLists'

const Navbar = (): JSX.Element => {
    const {user} = useAuthState()
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
                <Dropdown
                    component={<div>+</div>}
                    rightPosition={32}
                    itemList={dropDownProjectList}
                />
                <Dropdown
                    component={
                        <img
                            className='m-auto rounded-full'
                            src={user?.avatar}
                            alt='Profile'
                        />
                    }
                    rightPosition={8}
                    itemList={dropDownUserList}
                />
            </div>
        </nav>
    )
}

export default Navbar

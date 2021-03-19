import Link from 'next/link'

import {useAuthState} from '../hook/useAuthState'

const Navbar = (): JSX.Element => {
    const {user} = useAuthState()
    return (
        <nav className='flex justify-between items-center h-8v w-screen bg-blue-800 text-white'>
            <div className='inline-flex justify-evenly w-5/12'>
                <Link href='/'>
                    <a className='flex-initial'>Logo</a>
                </Link>
                <Link href='/list/projects'>
                    <a className='flex-initial'>Projects</a>
                </Link>
                <Link href='/list/collabs'>
                    <a className='flex-initial'>Collaborators</a>
                </Link>
            </div>
            <div className='inline-flex justify-around items-center w-2/12 h-full'>
                <Link href='/new/project'>
                    <a className='flex-initial'>+</a>
                </Link>
                <Link href='/user/profile' passHref>
                    <div className='flex-initial w-1/6'>
                        <img
                            className='m-auto rounded-full'
                            src={user?.avatar}
                            alt='Profile'
                        />
                    </div>
                </Link>
            </div>
        </nav>
    )
}

export default Navbar

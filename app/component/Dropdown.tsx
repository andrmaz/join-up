import * as React from 'react'
import Link from 'next/link'

import {SignOut} from './SignOut'

type ListItem = {
    href: string
    content: string
}

export function Dropdown({
    component,
    rightPosition,
    itemList,
}: {
    component: JSX.Element
    rightPosition: number
    itemList: ListItem[]
}): JSX.Element {
    const [visible, setVisible] = React.useState<boolean>(false)
    const toggleVisibility = (): void => setVisible(prevState => !prevState)
    return (
        <>
            <button className='flex-initial w-1/6' onClick={toggleVisibility}>
                <div>{component}</div>
            </button>
            {visible ? (
                <ul
                    className={`absolute top-18 right-${rightPosition} flex flex-col h-auto w-auto bg-black border-2 p-2 rounded z-40`}
                >
                    {itemList.map(({href, content}) => {
                        return content !== 'Sign Out' ? (
                            <Link key={href} href={href}>
                                <a className='flex-initial text-white m-1'>
                                    {content}
                                </a>
                            </Link>
                        ) : (
                            <SignOut key={href} content={content} />
                        )
                    })}
                </ul>
            ) : (
                ''
            )}
        </>
    )
}

import {useRouter} from 'next/router'
import {useCookies} from 'react-cookie'

import {useAuthDispatch} from '@hooks/useAuthDispatch'
import {logout} from '@actions/authActions'

type ListItem = {
    href: string
    content: string
}

export const SignOut = ({href, content}: ListItem): JSX.Element => {
    const dispatch = useAuthDispatch()
    const [, , removeCookie] = useCookies(['session'])
    const router = useRouter()
    function signOut(path: string): void {
        removeCookie('session', {path: '/', sameSite: true})
        logout(dispatch)
        router.push(path)
    }
    return <button onClick={() => signOut(href)}>{content}</button>
}

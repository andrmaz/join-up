import {useRouter} from 'next/router'
import {useCookies} from 'react-cookie'

import {useAuthDispatch} from '../hook/useAuthDispatch'
import {logout} from '../store/action/authActions'

export const SignOut = ({content}: {content: string}): JSX.Element => {
    const dispatch = useAuthDispatch()
    const [, , removeCookie] = useCookies(['session'])
    const router = useRouter()
    function signOut(): void {
        removeCookie('session', {path: '/', sameSite: true})
        logout(dispatch)
        router.push('/user/signin')
    }
    return <button onClick={() => signOut()}>{content}</button>
}

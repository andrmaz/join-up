import {useRouter} from 'next/router'
import {useCookies} from 'react-cookie'
import {useAuthDispatch} from '../hook/useAuthDispatch'

export const SignOut = ({content}: {content: string}): JSX.Element => {
    const dispatch = useAuthDispatch()
    const [, , removeCookie] = useCookies(['session'])
    const router = useRouter()
    function signOut(): void {
        removeCookie('session', {path: '/', sameSite: true})
        dispatch({type: 'logout'})
        router.push('/user/signin')
    }
    return <button onClick={() => signOut()}>{content}</button>
}

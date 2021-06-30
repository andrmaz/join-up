import {useCookies} from 'react-cookie'

export default function useSessionCookie(): string {
  //* Get user token from session cookie
  const [cookies] = useCookies(['session'])
  const {session: token} = cookies
  return token
}

import cookie from 'cookie'
import {IncomingMessage} from 'http'
import {NextApiRequestCookies} from 'next/dist/next-server/server/api-utils'

export function parseCookies(
  req: IncomingMessage & {cookies: NextApiRequestCookies}
): Record<string, string> {
  return cookie.parse((req && req.headers.cookie) || '')
}

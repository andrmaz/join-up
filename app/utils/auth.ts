import {GetServerSidePropsContext, GetServerSidePropsResult} from 'next'

import Router from 'next/router'
import {privateFetch} from './fetch'

export default async function checkAuth(
  context: GetServerSidePropsContext
): Promise<GetServerSidePropsResult<Record<string, never>> | void> {
  try {
    return await privateFetch(context).get('user')
  } catch {
    if (context.res) {
      //* handle server side redirect
      context.res.writeHead(302, {
        Location: '/signin',
      })
      context.res.end()
    } else {
      //* handle client side redirect
      Router.replace('/signin')
    }
  }
}

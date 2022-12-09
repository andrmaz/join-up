import * as trpcNext from '@trpc/server/adapters/next'

import {appRouter} from '../../../server/routers/_app'

// export API handler
export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => ({session: {user: {email: 'test@example.com'}}}),
  onError({error /* , type, path, input, ctx, req */}) {
    console.error('Error:', error)
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
    }
    if (error.code === 'BAD_REQUEST') {
      // send to bug reporting
    }
    if (error.code === 'UNAUTHORIZED') {
      // send to bug reporting
    }
    if (error.code === 'FORBIDDEN') {
      // send to bug reporting
    }
    if (error.code === 'NOT_FOUND') {
      // send to bug reporting
    }
  },
})

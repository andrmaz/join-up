import type {AppRouter} from '../../server/routers/_app'
import {createTRPCNext} from '@trpc/next'
import {httpBatchLink} from '@trpc/client'

function getBaseUrl(): string {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''

  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`

  if (process.env.RENDER_INTERNAL_HOSTNAME)
    // reference for render.com
    return `http://${process.env.RENDER_INTERNAL_HOSTNAME}:${process.env.PORT}`

  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config({ctx}) {
    if (typeof window !== 'undefined') {
      // during client requests
      return {
        //transformer: superjson, // optional - adds superjson serialization
        links: [
          httpBatchLink({
            url: '/api/trpc',
          }),
        ],
      }
    }

    return {
      links: [
        httpBatchLink({
          /**
           * If you want to use SSR, you need to use the server's full URL
           * @link https://trpc.io/docs/ssr
           **/
          url: `${getBaseUrl()}/api/trpc`,
          headers() {
            if (ctx?.req) {
              // To use SSR properly, you need to forward the client's headers to the server
              // This is so you can pass through things like cookies when we're server-side rendering
              // If you're using Node 18, omit the "connection" header
              /* const {
                connection: _connection,
                ...headers
              } = ctx.req.headers */
              return {
                ...ctx.req.headers,
                // Optional: inform server that it's an SSR request
                'x-ssr': '1',
              }
            }
            return {}
          },
        }),
      ],
      /**
       * @link https://react-query-v3.tanstack.com/reference/QueryClient
       **/
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    }
  },
  /**
   * @link https://trpc.io/docs/ssr
   **/
  ssr: true,
  responseMeta({clientErrors}) {
    if (clientErrors.length) {
      // propagate first http error from API calls
      return {
        status: clientErrors[0].data?.httpStatus ?? 500,
      }
    }
    // cache full page for 1 day + revalidate once every second
    const ONE_DAY_IN_SECONDS = 60 * 60 * 24
    return {
      'Cache-Control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
    }
  },
})
// => { useQuery: ..., useMutation: ...}

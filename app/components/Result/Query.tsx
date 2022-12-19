import * as React from 'react'

import {DefaultErrorShape} from '@trpc/server'
import {QueryStatus} from 'react-query'
import {TRPCClientErrorBase} from '@trpc/client'

type QueryError = TRPCClientErrorBase<DefaultErrorShape>

interface QueryResultProps<T> {
  status: QueryStatus
  error: QueryError | null
  data?: T
  children: (data: T) => React.ReactNode
}

export function QueryResult<TData>({
  status,
  error,
  data,
  children,
}: QueryResultProps<TData>): JSX.Element | null {
  if (status === 'error') {
    return <p data-testid='error'>ERROR: {error?.message}</p>
  }
  if (status === 'loading') {
    return <>Loading...</>
  }
  if (!data) {
    return <p data-testid='info'>Nothing to show...</p>
  }
  if (status === 'success') {
    return <>{children(data)}</>
  }
  return null
}

import * as React from 'react'

import {asyncReducer} from '@reducers/asyncReducer'

const initialState = {data: [], error: null, status: 'idle'}

export function useAsyncReducer(): ReadonlyArray<any> {
  const [state, dispatch] = React.useReducer(asyncReducer, initialState)
  return [state, dispatch] as const
}

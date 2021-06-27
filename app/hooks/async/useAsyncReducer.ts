import * as React from 'react'

import {asyncReducer} from '@reducers/asyncReducer'
import type {AsyncState, AsyncActions} from 'app/types/project'

const initialState = {data: [], error: null, status: 'idle'}

export function useAsyncReducer(): readonly [
  AsyncState,
  React.Dispatch<AsyncActions>
] {
  const [state, dispatch] = React.useReducer(asyncReducer, initialState)
  return [state, dispatch] //as const
}

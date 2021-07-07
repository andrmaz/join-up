import * as React from 'react'

import {asyncReducer} from '@reducers/asyncReducer'
import type {AsyncStateType, AsyncActionsType} from 'app/types/async'

const initialState: AsyncStateType = {status: 'idle', data: null, error: null}

export function useAsyncReducer(): readonly [
  AsyncStateType,
  React.Dispatch<AsyncActionsType>
] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<AsyncStateType, AsyncActionsType>
  >(asyncReducer, initialState)
  return [state, dispatch] //as const
}

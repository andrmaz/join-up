import * as React from 'react'

import {asyncReducer} from '@reducers/asyncReducer'
import type {AsyncStateType, AsyncActionsType} from 'app/types/async'
import type {ProjectsResponseType} from 'app/types/response'

import {Status} from 'app/types/constants'

const initialState: AsyncStateType<ProjectsResponseType> = {
  status: Status.idle,
  data: null,
  error: null,
}

export function useAsyncReducer(
  init?: AsyncStateType<ProjectsResponseType>
): readonly [
  AsyncStateType<ProjectsResponseType>,
  React.Dispatch<AsyncActionsType<ProjectsResponseType>>
] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<
      AsyncStateType<ProjectsResponseType>,
      AsyncActionsType<ProjectsResponseType>
    >
  >(asyncReducer, init || initialState)
  return [state, dispatch] //as const
}

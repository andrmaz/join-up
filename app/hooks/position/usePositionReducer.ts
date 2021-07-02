import * as React from 'react'

import {positionReducer} from '@reducers/positionReducer'
import {PositionStateType, PositionActionsType} from 'app/types/position'

export function usePositionReducer(): [
  PositionStateType,
  React.Dispatch<PositionActionsType>
] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<PositionStateType, PositionActionsType>
  >(positionReducer, {positions: []})
  return [state, dispatch]
}

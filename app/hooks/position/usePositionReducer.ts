import * as React from 'react'

import {positionReducer} from '@reducers/positionReducer'
import {PositionStateType, PositionActions} from 'app/types/position'

export function usePositionReducer(): [
  PositionStateType,
  React.Dispatch<PositionActions>
] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<PositionStateType, PositionActions>
  >(positionReducer, {positions: []})
  return [state, dispatch]
}

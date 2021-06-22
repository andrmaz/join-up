import * as React from 'react'

import {positionReducer} from '@reducers/positionReducer'
import {
  IPosistionData,
  PositionStateType,
  PositionActions,
} from 'app/types/position'
/**
 * @param  {IPosistionData[]} data
 */
export function usePositionReducer(
  data: IPosistionData[]
): [PositionStateType, React.Dispatch<PositionActions>] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<PositionStateType, PositionActions>
  >(positionReducer, {positions: []})
  React.useEffect(() => {
    dispatch({type: 'persist', payload: data})
    return () => dispatch({type: 'clear'})
  }, [data])
  return [state, dispatch]
}

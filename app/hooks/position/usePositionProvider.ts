import {usePositionReducer} from '@hooks/position/usePositionReducer'
import type {PositionContextType} from 'app/types/position'

export function usePositionProvider(): PositionContextType {
  const [state, dispatch] = usePositionReducer()
  return {state, dispatch}
}

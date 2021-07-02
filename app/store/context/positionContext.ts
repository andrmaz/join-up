import React from 'react'
import {PositionStateType, PositionDispatchType} from 'app/types/position'

export const PositionContext = React.createContext<
  {state: PositionStateType; dispatch: PositionDispatchType} | undefined
>(undefined)

PositionContext.displayName = 'Position Context'

import React from 'react'
import {PositionStateType, PositionDispatch} from 'app/types/position'

export const PositionContext = React.createContext<
  {state: PositionStateType; dispatch: PositionDispatch} | undefined
>(undefined)

PositionContext.displayName = 'Position Context'

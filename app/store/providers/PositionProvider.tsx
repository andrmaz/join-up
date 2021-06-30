import * as React from 'react'
import {usePositionProvider} from '@hooks/position/usePositionProvider'
import {PositionContext} from '@context/positionContext'
import type {PositionProviderProps} from 'app/types/position'

export function PositionProvider({
  children,
}: PositionProviderProps): React.ReactElement {
  const {state, dispatch} = usePositionProvider()
  //? you *might* need to memoize this value
  const value = {state, dispatch}
  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  )
}

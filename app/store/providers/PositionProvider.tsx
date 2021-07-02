import * as React from 'react'
import {usePositionProvider} from '@hooks/position/usePositionProvider'
import {PositionContext} from '@context/positionContext'
import type {ContainerPropsType} from 'app/types/container'

export function PositionProvider({
  children,
}: ContainerPropsType): React.ReactElement {
  const {state, dispatch} = usePositionProvider()
  //? you *might* need to memoize this value
  const value = {state, dispatch}
  return (
    <PositionContext.Provider value={value}>
      {children}
    </PositionContext.Provider>
  )
}

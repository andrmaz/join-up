import * as React from 'react'
import {PositionContext} from '@context/positionContext'
import type {PositionContextType} from 'app/types/position'

export function usePositionContext(): PositionContextType {
  const context = React.useContext(PositionContext)
  if (!context) {
    throw new Error('usePositionContext must be used within a PositionProvider')
  }
  return context
}

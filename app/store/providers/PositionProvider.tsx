import * as React from 'react'

import type {ChildrenPropsType} from 'app/types/modal'
import {PositionContext} from '@context/positionContext'
import {usePositionProvider} from '@hooks/position/usePositionProvider'

export function PositionProvider(props: ChildrenPropsType): React.ReactElement {
  const {state, dispatch} = usePositionProvider()
  //? you *might* need to memoize this value
  const value = {state, dispatch}
  return <PositionContext.Provider value={value} {...props} />
}

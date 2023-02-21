import * as React from 'react'
import {useProjectReducer} from '@hooks/project/useProjectReducer'
import {ProjectContextType, IProjectData} from 'app/types/project'
import {PAction} from 'app/types/constants'

export function useProjectProvider(): ProjectContextType {
  const [{projects}, dispatch] = useProjectReducer()

  const add = React.useCallback(
    (data: IProjectData): void => dispatch({type: PAction.add, payload: data}),
    [dispatch]
  )
  const remove = React.useCallback(
    (id: number): void => dispatch({type: PAction.remove, payload: id}),
    [dispatch]
  )
  const edit = React.useCallback(
    (data: IProjectData): void => dispatch({type: PAction.edit, payload: data}),
    [dispatch]
  )
  const persist = React.useCallback(
    (data: IProjectData[]): void =>
      dispatch({type: PAction.persist, payload: data}),
    [dispatch]
  )
  const clear = React.useCallback(
    (): void => dispatch({type: PAction.clear}),
    [dispatch]
  )

  return {projects, add, remove, edit, persist, clear}
}

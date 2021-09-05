import * as React from 'react'
import {useProjectReducer} from '@hooks/project/useProjectReducer'
import type {ProjectContextType, IProjectData} from 'app/types/project'
import {Actions} from 'app/types/project'

export function useProjectProvider(): ProjectContextType {
  const [{projects}, dispatch] = useProjectReducer()

  const add = React.useCallback(
    (data: IProjectData): void => dispatch({type: Actions.add, payload: data}),
    [dispatch]
  )
  const remove = React.useCallback(
    (id: number): void => dispatch({type: Actions.remove, payload: id}),
    [dispatch]
  )
  const edit = React.useCallback(
    (data: IProjectData): void => dispatch({type: Actions.edit, payload: data}),
    [dispatch]
  )
  const persist = React.useCallback(
    (data: IProjectData[]): void =>
      dispatch({type: Actions.persist, payload: data}),
    [dispatch]
  )
  const clear = React.useCallback(
    (): void => dispatch({type: Actions.clear}),
    [dispatch]
  )

  return {projects, add, remove, edit, persist, clear}
}

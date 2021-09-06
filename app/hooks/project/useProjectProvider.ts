import * as React from 'react'
import {useProjectReducer} from '@hooks/project/useProjectReducer'
import {ProjectContextType, IProjectData} from 'app/types/project'
import {PActions} from 'app/types/constants'

export function useProjectProvider(): ProjectContextType {
  const [{projects}, dispatch] = useProjectReducer()

  const add = React.useCallback(
    (data: IProjectData): void => dispatch({type: PActions.add, payload: data}),
    [dispatch]
  )
  const remove = React.useCallback(
    (id: number): void => dispatch({type: PActions.remove, payload: id}),
    [dispatch]
  )
  const edit = React.useCallback(
    (data: IProjectData): void =>
      dispatch({type: PActions.edit, payload: data}),
    [dispatch]
  )
  const persist = React.useCallback(
    (data: IProjectData[]): void =>
      dispatch({type: PActions.persist, payload: data}),
    [dispatch]
  )
  const clear = React.useCallback(
    (): void => dispatch({type: PActions.clear}),
    [dispatch]
  )

  return {projects, add, remove, edit, persist, clear}
}

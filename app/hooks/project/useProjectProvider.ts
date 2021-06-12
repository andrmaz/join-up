import * as React from 'react'
import {useProjectReducer} from '@hooks/project/useProjectReducer'
import type {
  ProjectContextType,
  IProjectData,
  ProjectState,
} from 'app/types/project'

export function useProjectProvider(): ProjectContextType {
  const [{projects}, dispatch] = useProjectReducer()

  const add = React.useCallback(
    (data: IProjectData): ProjectState =>
      dispatch({type: 'add', payload: data}),
    [dispatch]
  )
  const remove = React.useCallback(
    (id: string): ProjectState => dispatch({type: 'remove', payload: id}),
    [dispatch]
  )
  const edit = React.useCallback(
    (data: IProjectData): ProjectState =>
      dispatch({type: 'edit', payload: data}),
    [dispatch]
  )
  const persist = React.useCallback(
    (data: IProjectData[]): ProjectState =>
      dispatch({type: 'persist', payload: data}),
    [dispatch]
  )
  const clear = React.useCallback(
    (): ProjectState => dispatch({type: 'clear'}),
    [dispatch]
  )

  return {projects, add, remove, edit, persist, clear}
}

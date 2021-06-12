import * as React from 'react'

import {projectReducer} from '@reducers/projectReducer'
import type {ProjectActions, ProjectState} from 'app/types/project'

const initialState = {projects: []}

export function useProjectReducer(): readonly [
  ProjectState,
  React.Dispatch<ProjectActions>,
  React.EffectCallback
] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<ProjectState, ProjectActions>
  >(projectReducer, initialState)
  const {projects} = state
  const serializedProjects = JSON.stringify(projects)
  const updateLocalStorage = React.useCallback(() => {
    document.cookie.includes('session')
      ? window.localStorage.setItem('projects', serializedProjects)
      : window.localStorage.removeItem('projects')
  }, [serializedProjects])

  return [state, dispatch, updateLocalStorage]
}

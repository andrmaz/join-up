import * as React from 'react'

import {projectReducer} from '@reducers/projectReducer'
import type {ProjectActions, ProjectContextType} from 'app/types/project'

const initialState = {
  projects: [],
  add: () => '',
  remove: () => '',
  edit: () => '',
  persist: () => '',
  clear: () => '',
}

export function useProjectReducer(): [
  ProjectContextType,
  React.Dispatch<ProjectActions>
] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<ProjectContextType, ProjectActions>
  >(projectReducer, initialState)
  return [state, dispatch]
}

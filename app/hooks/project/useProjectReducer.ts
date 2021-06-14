import * as React from 'react'

import {projectReducer} from '@reducers/projectReducer'
import type {ProjectActions, ProjectState} from 'app/types/project'

const initialState = {projects: []}

export function useProjectReducer(): [
  ProjectState,
  React.Dispatch<ProjectActions>
] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<ProjectState, ProjectActions>
  >(projectReducer, initialState)
  return [state, dispatch]
}

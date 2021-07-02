import * as React from 'react'

import {projectReducer} from '@reducers/projectReducer'
import type {ProjectActionsType, ProjectContextType} from 'app/types/project'

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
  React.Dispatch<ProjectActionsType>
] {
  const [state, dispatch] = React.useReducer<
    React.Reducer<ProjectContextType, ProjectActionsType>
  >(projectReducer, initialState)
  return [state, dispatch]
}

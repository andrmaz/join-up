import * as React from 'react'
import {ProjectContext} from '@context/projectContext'
import type {ProjectState} from 'app/types/project'

export function useProjectContext(): ProjectState {
  const context = React.useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectState must be used within a ProjectProvider')
  }
  return context
}

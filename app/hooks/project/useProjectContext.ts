import * as React from 'react'
import {ProjectContext} from '@context/projectContext'
import type {ProjectContextType} from 'app/types/project'

export function useProjectContext(): ProjectContextType {
  const context = React.useContext(ProjectContext)
  if (!context) {
    throw new Error('useProjectContext must be used within a ProjectProvider')
  }
  return context
}

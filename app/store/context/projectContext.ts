/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import {UseProjectContextResults} from 'app/types/project'

export const ProjectContext = React.createContext<UseProjectContextResults>({
  projects: [],
  add: () => {},
  remove: () => {},
  edit: () => {},
  persist: () => {},
  clear: () => {},
})

ProjectContext.displayName = 'Project Context'

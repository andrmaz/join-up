/* eslint-disable @typescript-eslint/no-empty-function */
import * as React from 'react'
import {UseProjectContextResults} from 'app/types/project'

export const ProjectContext = React.createContext<
  UseProjectContextResults | undefined
>(undefined)

ProjectContext.displayName = 'Project Context'

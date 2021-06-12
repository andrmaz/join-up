import * as React from 'react'
import {useProjectProvider} from '@hooks/project/useProjectProvider'
import {ProjectContext} from '@context/projectContext'
import type {ProjectProviderProps} from 'app/types/project'

export function ProjectProvider(props: ProjectProviderProps): JSX.Element {
  const {projects, add, remove, edit, persist, clear} = useProjectProvider()
  const value = React.useMemo(() => {
    return {projects, add, remove, edit, persist, clear}
  }, [add, clear, edit, persist, projects, remove])
  return <ProjectContext.Provider value={value} {...props} />
}

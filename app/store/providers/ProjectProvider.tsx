import * as React from 'react'
import {useProjectProvider} from '@hooks/project/useProjectProvider'
import {ProjectContext} from '@context/projectContext'
import type {ChildrenPropsType} from 'app/types/modal'

export function ProjectProvider(props: ChildrenPropsType): JSX.Element {
  const {projects, add, remove, edit, persist, clear} = useProjectProvider()
  const value = React.useMemo(() => {
    return {projects, add, remove, edit, persist, clear}
  }, [add, clear, edit, persist, projects, remove])
  return <ProjectContext.Provider value={value} {...props} />
}

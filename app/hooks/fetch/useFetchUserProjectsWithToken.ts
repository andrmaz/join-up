import * as React from 'react'
import axios, {Canceler} from 'axios'
import {useProjectContext} from '@hooks/project/useProjectContext'
import type {ProjectStateType} from 'app/types/project'
import type {ProjectsResponseType} from 'app/types/response'

export default function useFetchUserProjectsWithToken(
  token: string
): ProjectStateType {
  const {projects, persist, clear} = useProjectContext()
  React.useEffect(() => {
    let cancel: Canceler
    ;(async () => {
      try {
        const {
          data: {projects},
        } = await axios.get<ProjectsResponseType>('/project/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cancelToken: new axios.CancelToken(c => (cancel = c)),
        })
        persist(projects)
      } catch (thrown) {
        if (axios.isCancel(thrown)) {
          console.log('Request canceled', thrown.message)
          return thrown.message
        } else {
          Promise.reject(thrown)
        }
      }
    })()
    //* Cleanup
    return () => {
      //* cancel the request
      cancel()
      clear()
    }
  }, [clear, persist, token])
  return projects
}

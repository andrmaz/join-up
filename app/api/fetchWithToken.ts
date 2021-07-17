import axios, {AxiosResponse} from 'axios'
import type {IProjectInput, NestedStringsType} from 'app/types/project'
import type {IPositionInput} from 'app/types/position'
import type {
  ProjectResponseType,
  ProjectsResponseType,
  PositionResponseType,
  RemoveProjectResponseType,
  RemovePositionResponseType,
  StatusResponseType,
} from 'app/types/response'

export async function fetchProjectsWithToken(
  token: string,
  date: NestedStringsType,
  match: NestedStringsType,
  available: NestedStringsType,
  technologies: NestedStringsType
): Promise<AxiosResponse<ProjectsResponseType>> {
  //* technologies and match must be checked before each fetching
  const tech =
    technologies && technologies.length
      ? `&technologies=${technologies.toString()},`
      : ''
  const matches = match ? `&match=${match}` : ''
  const response = await axios.get<ProjectsResponseType>(
    `/project?sort=${date}${matches}&hasPositions=${available}${tech}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

export async function addProjectWithToken(
  data: IProjectInput,
  token: string
): Promise<AxiosResponse<ProjectResponseType>> {
  const response = await axios.post<ProjectResponseType>(
    '/project',
    {
      project: data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

export async function editProjectWithToken(
  data: IProjectInput,
  id: number,
  token: string
): Promise<AxiosResponse<ProjectResponseType>> {
  const response = await axios.patch<ProjectResponseType>(
    `/project/${id}`,
    {
      project: data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

export async function addPositionWithToken(
  data: IPositionInput,
  token: string
): Promise<AxiosResponse<PositionResponseType>> {
  const response = await axios.post<PositionResponseType>(
    '/position',
    {
      position: data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

export async function editPositionWithToken(
  data: IPositionInput,
  token: string,
  id: number
): Promise<AxiosResponse<PositionResponseType>> {
  data.projectId = parseInt(window.location.pathname.slice(10))
  const response = await axios.patch<PositionResponseType>(
    `/position/${id}`,
    {
      position: data,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

export async function deleteProjectByIdWithToken(
  token: string,
  id: number
): Promise<AxiosResponse<RemoveProjectResponseType>> {
  const response = await axios.delete<RemoveProjectResponseType>(
    `/project/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

export async function deletePositionByIdWithToken(
  token: string,
  id: number
): Promise<AxiosResponse<RemovePositionResponseType>> {
  const response = await axios.delete<RemovePositionResponseType>(
    `/position/${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

export async function addApplicationWithToken(
  id: number,
  token: string
): Promise<AxiosResponse<StatusResponseType>> {
  const response = await axios.post<StatusResponseType>(
    '/application',
    {
      position: id,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )
  return response
}

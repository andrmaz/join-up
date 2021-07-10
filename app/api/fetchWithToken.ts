import axios, {AxiosResponse} from 'axios'
import type {NestedStringsType} from 'app/types/project'
import type {IPositionInput} from 'app/types/position'
import type {
  PositionResponseType,
  ProjectsResponseType,
  RemoveProjectResponseType,
  RemovePositionResponseType,
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

export async function addPositionWithToken(
  data: IPositionInput,
  token: string
): Promise<AxiosResponse<PositionResponseType>> {
  data.projectId = parseInt(window.location.pathname.slice(10))
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

import axios, {AxiosResponse} from 'axios'
import type {
  TechnologiesResponseType,
  ProjectsResponseType,
} from 'app/types/response'

export async function fetchTechnologiesWithToken(
  url: string,
  token: string
): Promise<AxiosResponse<TechnologiesResponseType>> {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function fetchProjectsWithToken(
  url: string,
  token: string
): Promise<AxiosResponse<ProjectsResponseType>> {
  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return res
  } catch (err) {
    return Promise.reject(err)
  }
}

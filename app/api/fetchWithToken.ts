import axios from 'axios'
import type {
  TechnologiesResponseType,
  LanguagesResponseType,
} from 'app/types/response'

export async function fetchTechnologiesWithToken(
  token: string
): Promise<TechnologiesResponseType> {
  try {
    const response = await axios.get('/technology', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const {data} = response
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

export async function fetchLanguagesWithToken(
  token: string
): Promise<LanguagesResponseType> {
  try {
    const response = await axios.get('/language', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    const {data} = response
    return Promise.resolve(data)
  } catch (err) {
    return Promise.reject(err)
  }
}

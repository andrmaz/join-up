import {SelectOptionsType} from 'app/types/form'
import {TechnologiesResponseType} from 'app/types/response'
import axios from 'axios'
import {publicFetch} from '@utils/fetch'

async function getTechnologies(path: string): Promise<SelectOptionsType[]> {
  try {
    const response = await publicFetch.get<TechnologiesResponseType>(
      `/technology${path}`
    )
    const {technologies} = response.data
    return technologies
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log('Request canceled', error)
      return Promise.reject()
    } else {
      throw error
    }
  }
}

export {getTechnologies}

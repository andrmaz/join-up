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
    return Promise.resolve(technologies)
  } catch (thrown: any) {
    if (axios.isCancel(thrown)) {
      return thrown.message
    } else {
      return Promise.reject(thrown)
    }
  }
}

export {getTechnologies}

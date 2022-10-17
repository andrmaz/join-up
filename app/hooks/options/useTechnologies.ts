import type {SelectOptionsType} from 'app/types/form'
import {getTechnologies} from '@api/technologies'
import {useQuery} from 'react-query'

export default function useTechnologies(id?: number): {
  isError: boolean
  data: SelectOptionsType[] | undefined
  error: Error | null
} {
  const endpoint: string = id ? `/project/${id}` : ''
  const {isError, data, error} = useQuery<SelectOptionsType[], Error>({
    queryKey: ['technologies', endpoint],
    queryFn: () => getTechnologies(endpoint),
    cacheTime: 604800000, // 1 week
    staleTime: 604800000, // 1 week
  })
  return {isError, data, error} as const
}

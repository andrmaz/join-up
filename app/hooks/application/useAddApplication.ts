import type {StatusResponseType} from 'app/types/response'
import {trpc} from '@utils/trpc'
import useModalContext from '@hooks/modal/useModalContext'

export default function useAddApplication(
  id: number
): readonly [() => Promise<StatusResponseType>] {
  const result = trpc.application.create.useMutation()
  const {setIsOpen} = useModalContext()
  const handleConfirm = async (): Promise<StatusResponseType> => {
    try {
      const response = await result.mutateAsync({id})
      if (response.status === 201) {
        setIsOpen(false)
        return response
      }
      return Promise.reject({message: 'Something went wrong'})
    } catch (error) {
      return Promise.reject(error)
    }
  }
  return [handleConfirm] as const
}

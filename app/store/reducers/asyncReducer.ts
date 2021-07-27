import type {AsyncStateType, AsyncActionsType} from 'app/types/async'
import type {ProjectsResponseType} from 'app/types/response'

export function asyncReducer(
  state: AsyncStateType<ProjectsResponseType>,
  action: AsyncActionsType<ProjectsResponseType>
): AsyncStateType<ProjectsResponseType> {
  switch (action.type) {
    case 'pending':
      return {status: 'pending', data: null, error: null}
    case 'resolved':
      return {status: 'resolved', data: action.payload, error: null}
    case 'rejected':
      return {status: 'rejected', data: null, error: action.payload}
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

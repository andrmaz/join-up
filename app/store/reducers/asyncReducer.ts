import type {AsyncStateType, AsyncActionsType} from 'app/types/async'
import type {ProjectsResponseType} from 'app/types/response'
import {Status} from 'app/types/constants'

export function asyncReducer(
  state: AsyncStateType<ProjectsResponseType>,
  action: AsyncActionsType<ProjectsResponseType>
): AsyncStateType<ProjectsResponseType> {
  switch (action.type) {
    case Status.pending:
      return {status: Status.pending, data: null, error: null}
    case Status.resolved:
      return {status: Status.resolved, data: action.payload, error: null}
    case Status.rejected:
      return {status: Status.rejected, data: null, error: action.payload}
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

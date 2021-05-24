import type {AsyncState, AsyncActions} from 'app/types/project'

export function asyncReducer(
  state: AsyncState,
  action: AsyncActions
): AsyncState {
  switch (action.type) {
    case 'pending':
      return {status: 'pending', data: [], error: null}
    case 'resolved':
      return {status: 'resolved', data: action.payload, error: null}
    case 'rejected':
      return {status: 'rejected', data: [], error: action.payload}
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

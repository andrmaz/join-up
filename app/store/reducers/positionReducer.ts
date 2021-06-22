import {
  PositionActions,
  PositionStateType,
  IPosistionData,
} from 'app/types/position'

export function positionReducer(
  state: PositionStateType,
  action: PositionActions
): PositionStateType {
  let index: number
  let positionCopy: IPosistionData | undefined
  let positionsCopy: IPosistionData[]
  let updatedPosition: IPosistionData
  let filteredPositions: IPosistionData[]
  let updatedPositions: IPosistionData[]
  switch (action.type) {
    case 'add':
      positionsCopy = [...state.positions]
      updatedPositions = [...positionsCopy, action.payload]
      return {
        ...state,
        positions: updatedPositions,
      }
    case 'remove':
      index = state.positions.findIndex(
        (position: IPosistionData) => position.id === action.payload
      )
      positionsCopy = [...state.positions]
      positionsCopy.splice(index, 1)
      return {
        ...state,
        positions: positionsCopy,
      }
    case 'edit':
      positionCopy = state.positions.find(
        (position: IPosistionData) => position.id === action.payload.id
      )
      updatedPosition = Object.assign({...positionCopy}, action.payload)
      positionsCopy = [...state.positions]
      filteredPositions = positionsCopy.filter(
        (position: IPosistionData) => position.id !== updatedPosition.id
      )
      updatedPositions = [...filteredPositions, updatedPosition]
      return {
        positions: updatedPositions,
      }
    case 'persist':
      //* State will be an empty Array
      positionsCopy = [...state.positions]
      //* create a fresh, new store instance on every request
      updatedPositions = action.payload.concat(
        //* Merging objects arrays without creating duplicate objects
        positionsCopy.filter(
          ({id}) => !action.payload.find(position => position.id === id)
        )
      )
      return {
        ...state,
        positions: updatedPositions,
      }
    case 'clear':
      return {
        ...state,
        positions: [],
      }
    default: {
      throw new Error(`Unhandled type at ${action} action`)
    }
  }
}

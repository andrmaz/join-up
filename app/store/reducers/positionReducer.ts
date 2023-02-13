import type {
  PositionActionsType,
  PositionStateType,
  IPositionData,
} from 'app/types/position'
import {PAction} from 'app/types/constants'

export function positionReducer(
  state: PositionStateType,
  action: PositionActionsType
): PositionStateType {
  let index: number
  let positionCopy: IPositionData | undefined
  let positionsCopy: IPositionData[]
  let updatedPosition: IPositionData
  let filteredPositions: IPositionData[]
  let updatedPositions: IPositionData[]
  switch (action.type) {
    case PAction.add:
      positionsCopy = [...state.positions]
      updatedPositions = [...positionsCopy, action.payload]
      return {
        ...state,
        positions: updatedPositions,
      }
    case PAction.remove:
      index = state.positions.findIndex(
        (position: IPositionData) => position.id === action.payload
      )
      positionsCopy = [...state.positions]
      positionsCopy.splice(index, 1)
      return {
        ...state,
        positions: positionsCopy,
      }
    case PAction.edit:
      positionCopy = state.positions.find(
        (position: IPositionData) => position.id === action.payload.id
      )
      updatedPosition = Object.assign({...positionCopy}, action.payload)
      positionsCopy = [...state.positions]
      filteredPositions = positionsCopy.filter(
        (position: IPositionData) => position.id !== updatedPosition.id
      )
      updatedPositions = [...filteredPositions, updatedPosition]
      return {
        positions: updatedPositions,
      }
    case PAction.persist:
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
    case PAction.clear:
      return {
        ...state,
        positions: [],
      }
    default: {
      throw new Error(`Unhandled type at ${action} action`)
    }
  }
}

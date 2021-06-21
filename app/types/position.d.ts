import {NestedValue} from 'react-hook-form'
import {SelectOptions} from 'app/types/form'
export interface IPositionInput {
  projectId: string | null
  title: string
  description: string
  technologies: NestedValue<SelectOptions[]>
  vacancies: number
  level: string
  role: string
}
export interface IPosistionData {
  id: string
  title: string
  description: string
  technologies: NestedValue<SelectOptions[]>
  vacancies: number
  level: string
  role: string
  projectId: number
  userId: number
  applicants: number
  createdAt: string
  updatedAt: string
}

export type PositionStateType = {positions: Array<IPosistionData>}

export type PositionActions =
  | {type: 'add'; payload: IPosistionData}
  | {type: 'remove'; payload: string}
  | {type: 'edit'; payload: IPosistionData}
  | {type: 'persist'; payload: IPosistionData[]}
  | {type: 'clear'}

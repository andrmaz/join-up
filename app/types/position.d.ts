import type {NestedOptions} from 'app/types/form'

export interface IPositionInput {
  projectId: string
  title: string
  description: string
  technologies: NestedOptions
  vacancy: number
  level: string
  role: string
}
export interface IPosistionData {
  _id: string
  title: string
  sortTitle: string
  description: string
  technologies: NestedOptions
  project: string
  positions: number
  createdAt: string
  updatedAt: string
}

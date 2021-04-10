import type {NestedOptions} from 'app/types/form'

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

import type {NestedOptions} from 'app/types/form'

export interface IPositionInput {
  projectId: string
  title: string
  description: string
  technologies: NestedOptions
  vacancies: number
  level: string
  role: string
}
export interface IPosistionData {
  id: string
  title: string
  description: string
  technologies: NestedOptions
  vacancies: number
  level: string
  role: string
  createdAt: string
  updatedAt: string
  projectId: string
}

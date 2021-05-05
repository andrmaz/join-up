import type {NestedOptions} from 'app/types/form'

export interface IPositionInput {
  projectId: string | null
  title: string
  description: string
  technologies: NestedOptions
  vacancies: number
  level: string
  role: string
}
export interface IPosistionData {
  id: number
  title: string
  description: string
  technologies: NestedOptions
  vacancies: number
  level: string
  role: string
  projectId: number
  userId: number
  createdAt: string
  updatedAt: string
}

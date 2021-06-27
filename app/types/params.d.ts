import type {IProjectData} from 'app/types/project'
import type {IPosistionData} from 'app/types/position'
import {SelectOptions} from 'app/types/form'

export type ProjectSlugPageParams = {
  project: IProjectData
  positions: IPosistionData[]
}

export type SignUpPageParams = {
  technologies: SelectOptions[]
  languages: SelectOptions[]
}

export type ProjectsPageParams = {
  token: string
  options: SelectOptions[]
}

export type ProjectPageParams = {
  token: string
  technologies: SelectOptions[]
}

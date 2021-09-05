import * as React from 'react'
import {SelectOptionsType} from 'app/types/form'

enum Levels {
  junior = 'Junior',
  mid = 'Mid',
  senior = 'Senior',
  lead = 'Lead',
}
enum Roles {
  PM = 'Project manager',
  RA = 'Requirement analyst',
  UX = 'UX designer',
  UI = 'UI designer',
  QA = 'QA engineer',
  FE = 'Front-end developer',
  BE = 'Back-end developer',
  FS = 'Full-stack developer',
  MS = 'Marketing strategist',
  SS = 'SEO specialist',
  CS = 'Content specialist',
  TS = 'Testing specialist',
  SA = 'Security analyst',
}
export interface IPositionInput {
  projectId: number
  title: string
  qualifications: string
  duties: string
  technologies: SelectOptionsType[]
  vacancies: number
  level: keyof typeof Levels
  role: keyof typeof Roles
}
export interface IPositionData {
  id: number
  title: string
  qualifications: string
  duties: string
  technologies: SelectOptionsType[]
  vacancies: number
  level: SelectOptionsType
  role: SelectOptionsType
  projectId: number
  userId: number
  applicants: number
  createdAt: string
  updatedAt: string
}

export type PositionStateType = {positions: Array<IPositionData>}

export enum Actions {
  add = 'add',
  remove = 'remove',
  edit = 'edit',
  persist = 'persist',
  clear = 'clear',
}

export type PositionActionsType =
  | {type: Actions.add; payload: IPositionData}
  | {type: Actions.remove; payload: number}
  | {type: Actions.edit; payload: IPositionData}
  | {type: Actions.persist; payload: IPositionData[]}
  | {type: Actions.clear}

export type PositionDispatchType = (action: PositionActionsType) => void

export type PositionContextType = {
  state: PositionStateType
  dispatch: PositionDispatchType
}

export type PositionOverviewType = {
  isSelectedTab: boolean
  index: number
  position: IPositionData
}

export type PositionPreviewType = {
  index: number
  isSelectedTab: boolean
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>
  tabRef: React.MutableRefObject<HTMLButtonElement | null>
  position: IPositionData
}

export type PositionTabsType = {
  positions: IPositionData[]
  selectedTab: number
  setSelectedTab: React.Dispatch<React.SetStateAction<typeof selectedTab>>
}

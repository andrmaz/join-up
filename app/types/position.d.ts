import * as React from 'react'
import {SelectOptionsType} from 'app/types/form'
import {PAction, Technology} from 'app/types/constants'
import {Level, Role} from 'app/types/constants'

export interface IPositionInput {
  projectId: number
  title: string
  qualifications: string
  duties: string
  technologies: SelectOptionsType<Technology>[]
  vacancies: number
  level: keyof typeof Level
  role: keyof typeof Role
}
export interface IPositionData {
  id: number
  title: string
  qualifications: string
  duties: string
  technologies: SelectOptionsType<Technology>[]
  vacancies: number
  level: SelectOptionsType<Level>
  role: SelectOptionsType<Role>
  projectId: number
  userId: number
  applicants: number
  created_at: string
  updated_at: string
}

export type PositionStateType = {positions: Array<IPositionData>}

export type PositionActionsType =
  | {type: PAction.add; payload: IPositionData}
  | {type: PAction.remove; payload: number}
  | {type: PAction.edit; payload: IPositionData}
  | {type: PAction.persist; payload: IPositionData[]}
  | {type: PAction.clear}

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

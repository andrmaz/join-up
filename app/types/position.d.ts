import * as React from 'react'
import {SelectOptionsType} from 'app/types/form'
import {PActions} from 'app/types/constants'
import {Levels, Roles} from 'app/types/constants'
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

export type PositionActionsType =
  | {type: PActions.add; payload: IPositionData}
  | {type: PActions.remove; payload: number}
  | {type: PActions.edit; payload: IPositionData}
  | {type: PActions.persist; payload: IPositionData[]}
  | {type: PActions.clear}

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

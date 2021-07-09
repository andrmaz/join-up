import {SelectOptionsType} from 'app/types/form'
import React from 'react'
export interface IPositionInput {
  projectId: string | null
  title: string
  qualifications: string
  duties: string
  technologies: SelectOptionsType[]
  vacancies: number
  level: string
  role: string
}
export interface IPositionData {
  id: string
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
  | {type: 'add'; payload: IPositionData}
  | {type: 'remove'; payload: string}
  | {type: 'edit'; payload: IPositionData}
  | {type: 'persist'; payload: IPositionData[]}
  | {type: 'clear'}

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

export type EditPositoinType = {
  position: IPositionData
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<typeof showModal>>
}

export type RemovePositionType = {
  uid: string
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<typeof showDialog>>
}

export type PositionValuesType = {
  title: string
  vacancies: number
  qualifications: string
  duties: string
  level: SelectOptionsType
  role: SelectOptionsType
  technologies: SelectOptionsType[]
}

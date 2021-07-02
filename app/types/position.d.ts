import {NestedValue} from 'react-hook-form'
import {SelectOptionsType} from 'app/types/form'
import React from 'react'
export interface IPositionInput {
  projectId: string | null
  title: string
  description: string
  technologies: NestedValue<SelectOptionsType[]>
  vacancies: number
  level: string
  role: string
}
export interface IPosistionData {
  id: string
  title: string
  description: string
  technologies: NestedValue<SelectOptionsType[]>
  vacancies: number
  level: SelectOptionsType
  role: SelectOptionsType
  projectId: number
  userId: number
  applicants: number
  createdAt: string
  updatedAt: string
}

export type PositionStateType = {positions: Array<IPosistionData>}

export type PositionActionsType =
  | {type: 'add'; payload: IPosistionData}
  | {type: 'remove'; payload: string}
  | {type: 'edit'; payload: IPosistionData}
  | {type: 'persist'; payload: IPosistionData[]}
  | {type: 'clear'}

export type PositionDispatchType = (action: PositionActionsType) => void

export type PositionContextType = {
  state: PositionStateType
  dispatch: PositionDispatchType
}

export type PositionOverviewType = {
  isSelectedTab: boolean
  index: number
  position: IPosistionData
}

export type PositionPreviewType = {
  index: number
  isSelectedTab: boolean
  setSelectedTab: React.Dispatch<React.SetStateAction<number>>
  tabRef: React.MutableRefObject<HTMLButtonElement | null>
  position: IPosistionData
}

export type PositionTabsType = {
  positions: IPosistionData[]
  selectedTab: number
  setSelectedTab: React.Dispatch<React.SetStateAction<typeof selectedTab>>
}

export type EditPositoinType = {
  position: IPosistionData
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<typeof showModal>>
}

export type RemovePositionType = {
  uid: string
  showDialog: boolean
  setShowDialog: React.Dispatch<React.SetStateAction<typeof showDialog>>
}
